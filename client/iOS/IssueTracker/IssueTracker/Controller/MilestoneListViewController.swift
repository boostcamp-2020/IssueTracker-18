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
        let configuration = UICollectionLayoutListConfiguration(appearance: .plain)
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
    
    enum Section {
        case main
    }
}
