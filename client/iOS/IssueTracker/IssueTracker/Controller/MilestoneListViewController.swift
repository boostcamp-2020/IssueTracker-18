//
//  MilestoneListViewController.swift
//  IssueTracker
//
//  Created by 류연수 on 2020/11/03.
//

import UIKit

class MilestoneListViewController: UIViewController, UICollectionViewDelegate {
    
    // MARK: - @IBOutlet Properties
    @IBOutlet weak var navigationBar: UINavigationBar!
    @IBOutlet weak var collectionView: UICollectionView!
    
    @IBAction func showPopUp(_ sender: UIBarButtonItem) {
        presentAsPopUp(senderType: .milestone) { [weak self] in
            self?.dataSourceUpdateFromNetwork()
        }
    }
    
    // MARK: - Properties
    private lazy var dataSource = createDataSource()
    private let api = NetworkManager()
    
    //MARK: - Value Types
    typealias MilestoneDataSource = UICollectionViewDiffableDataSource<Section, Milestone>
    
    // MARK: - Life Cycle Methods
    override func viewDidLoad() {
        super.viewDidLoad()
        configureNavigationBar(navigationBar)
        configureCollectionView()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(true)
        dataSourceUpdateFromNetwork()
    }
    
    // MARK: - Methods
    
    private func configureCollectionView() {
        collectionView.collectionViewLayout = createLayout()
        collectionView.delegate = self
    }
    
    private func createDataSource() -> MilestoneDataSource {
        let dataSource = MilestoneDataSource(
            collectionView: collectionView,
            cellProvider: { (collectionView, indexPath, milestone) ->
                UICollectionViewCell? in
                let cell = collectionView.dequeueReusableCell(
                    withReuseIdentifier: "MilestoneCollectionViewCell",
                    for: indexPath) as? MilestoneCollectionViewCell
                cell?.title.text = milestone.title
                cell?.descriptText.text = milestone.description ?? ""
                cell?.title.configureView(kind: .milestone)
                return cell
            })
        
        return dataSource
    }
    
    private func createLayout() -> UICollectionViewLayout {
        var configuration = UICollectionLayoutListConfiguration(appearance: .plain)
        configuration.trailingSwipeActionsConfigurationProvider = { [weak self]
            (indexPath) in
            guard let self = self else { return nil }
            guard let milstone = self.dataSource.itemIdentifier(for: indexPath) else {
                return nil
            }
            return self.trailingSwipeActionConfigurationForListCellItem(milstone)
        }
        return UICollectionViewCompositionalLayout.list(using: configuration)
    }
    
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        collectionView.deselectItem(at: indexPath, animated: true)
    }
    
    private func dataSourceUpdateFromNetwork() {
        let api = NetworkManager()
        let parameters: Milestone? = nil
        api.request(type: RequestType(endPoint: "milestone", method: .get, parameters: parameters)) { [weak self] (data: [Milestone]) in
            var snapshot = NSDiffableDataSourceSnapshot<Section, Milestone>()
            snapshot.appendSections([.main])
            snapshot.appendItems(data)
            self?.dataSource.apply(snapshot)
        }
    }
    
    func trailingSwipeActionConfigurationForListCellItem(_ milestone: Milestone) -> UISwipeActionsConfiguration? {
        var closeParameters = milestone
        closeParameters.isOpen = !milestone.isOpen
        let closeRequestType = RequestType(endPoint: "milestone",
                                      method: .patch,
                                      parameters: closeParameters,
                                      id: milestone.id)
        let closeAction = createAction(title: "Close",
                                        requestType: closeRequestType,
                                        response: UpadateResponse(numOfaffectedRows: 0))
        closeAction.backgroundColor = .systemGreen
        
        let deleteParameters: Milestone? = nil
        let deleteRequestType = RequestType(endPoint: "milestone",
                                      method: .delete,
                                      parameters: deleteParameters,
                                      id: milestone.id)
        let deleteAction = createAction(title: "Delete",
                                        requestType: deleteRequestType,
                                        response: UpadateResponse(numOfaffectedRows: 0))
        deleteAction.backgroundColor = .systemRed
        return UISwipeActionsConfiguration(actions: [deleteAction, closeAction])
    }
    
    private func createAction<T: Codable, U: Codable> (title: String, requestType: RequestType<T>, response: U) -> UIContextualAction {
        let action = UIContextualAction(style: .normal, title: title) {
            [weak self] (_, _, completion) in
            guard let self = self else {
                completion(false)
                return
            }
            self.api.request(type: requestType) { [weak self] (data: U) in
                print(data)
                self?.dataSourceUpdateFromNetwork()
            }
            completion(true)
        }
        return action
    }
    
}
