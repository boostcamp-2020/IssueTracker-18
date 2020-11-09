//
//  IssueListViewController.swift
//  IssueTracker
//
//  Created by A on 2020/10/28.
//

import UIKit

// test
enum Section: Hashable {
    case main
}

class IssueListViewController: UIViewController, UICollectionViewDelegate {
    
    // MARK: - @IBOutlet Properties
    @IBOutlet weak var newIssueButton: UIButton!
    @IBOutlet weak var collectionView: UICollectionView!
    
    // MARK: - Properties
    private lazy var dataSource = createDataSource()
    private let api = NetworkManager()

    //MARK: - Value Types
    typealias IssueDataSource = UICollectionViewDiffableDataSource<Section, Issue>
    
    // MARK: - Life Cycle Methods
    override func viewDidLoad() {
        super.viewDidLoad()
        configureNavigationBar()
        configureNewIssueButton()
        configureCollectionView()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        dataSourceUpdateFromNetwork()
    }

    // MARK: - Methods
    private func configureNavigationBar() {
        self.navigationController?.navigationBar.shadowImage = UIImage()
        self.navigationController?.navigationBar.barTintColor = .systemBackground
        self.navigationController?.navigationBar.isTranslucent = false
    }
    
    private func configureNewIssueButton() {
        view.bringSubviewToFront(newIssueButton)
    }
    
    private func configureCollectionView() {
        collectionView.collectionViewLayout = createLayout()
        collectionView.delegate = self
    }
    
    private func createDataSource() -> IssueDataSource {
        let dataSource = IssueDataSource(
            collectionView: collectionView,
            cellProvider: { (collectionView, indexPath, issue) ->
                UICollectionViewCell? in
                let cell = collectionView.dequeueReusableCell(
                    withReuseIdentifier: "IssueCollectionViewCell",
                    for: indexPath) as? IssueCollectionViewCell
                cell?.titleLabel.text = issue.title
                cell?.descriptionLabel.text = issue.comments.first?.content
                cell?.milestoneBadgeLabel.text = issue.milestone?.title
                cell?.milestoneBadgeLabel.configureView(kind: .milestone)
                cell?.labelBadgeLabel.text = issue.labels?.first?.title
                if let labelColor = issue.labels?.first?.color {
                    cell?.labelBadgeLabel.configureView(kind: .label, backgroundColor: labelColor)
                }
                return cell
            })
        
        return dataSource
    }
    
    private func dataSourceUpdateFromNetwork() {
        let parameters: Issue? = nil
        api.request(type: RequestType(endPoint: "issue", method: .get, parameters: parameters)) { [self] (data: [Issue]) in
            var snapshot = NSDiffableDataSourceSnapshot<Section, Issue>()
            snapshot.appendSections([.main])
            snapshot.appendItems(data)
            dataSource.apply(snapshot)
        }
    }
    
    private func createLayout() -> UICollectionViewLayout {
        var configuration = UICollectionLayoutListConfiguration(appearance: .plain)
        configuration.trailingSwipeActionsConfigurationProvider = { [weak self] (indexPath) in
            guard let self = self else { return nil }
            guard let issue = self.dataSource.itemIdentifier(for: indexPath) else { return nil }
            return self.trailingSwipeActionConfigurationForListCellItem(issue)
        }
        
        return UICollectionViewCompositionalLayout.list(using: configuration)
    }
    
    func trailingSwipeActionConfigurationForListCellItem(_ issue: Issue) -> UISwipeActionsConfiguration? {
        var closeParameters = issue
        closeParameters.isOpen = !issue.isOpen
        let closeRequestType = RequestType(endPoint: "issue",
                                      method: .patch,
                                      parameters: closeParameters,
                                      id: issue.id)
        let closeAction = createAction(title: "Close",
                                        issue: issue,
                                        requestType: closeRequestType,
                                        response: IssueResponse(numOfaffectedRows: 0))
        closeAction.backgroundColor = .systemGreen
        
        let deleteParameters: Issue? = nil
        let deleteRequestType = RequestType(endPoint: "issue",
                                      method: .delete,
                                      parameters: deleteParameters,
                                      id: issue.id)
        let deleteAction = createAction(title: "Delete",
                                        issue: issue,
                                        requestType: deleteRequestType,
                                        response: IssueResponse(numOfaffectedRows: 0))
        deleteAction.backgroundColor = .systemRed
        return UISwipeActionsConfiguration(actions: [deleteAction, closeAction])
    }
    
    private func createAction<T: Codable, U: Codable> (title: String, issue: Issue, requestType: RequestType<T>, response: U) -> UIContextualAction {
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
    
