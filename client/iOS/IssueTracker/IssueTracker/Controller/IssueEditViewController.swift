//
//  IssueEditViewController.swift
//  IssueTracker
//
//  Created by 류연수 on 2020/11/09.
//

import UIKit

class IssueEditViewController: UIViewController {

    // MARK:- @IBOutlet Properties
    @IBOutlet weak var navigationBar: UINavigationBar!
    @IBOutlet weak var headerLabel: UILabel!
    @IBOutlet weak var collectionView: UICollectionView!
    
    @IBAction func cancelButton(_ sender: UIBarButtonItem) {
        dismiss(animated: true, completion: nil)
    }
    @IBAction func closeSelected(_ sender: UIBarButtonItem) {
        for issue in checkedIssues {
            var issue = issue
            issue.isOpen = false
            let closeRequestType = RequestType(endPoint: "issue",
                                          method: .patch,
                                          parameters: issue,
                                          id: issue.id)
            api.request(type: closeRequestType) { (data: IssueResponse) in
                print(data)
            }
        }
        dismiss(animated: true, completion: nil)
    }
    
    // MARK:- Properties
    private var checkedIssues = Set<Issue>()
    private lazy var dataSource = createDataSource()
    private let api = NetworkManager()
    
    //MARK: - Value Types
    typealias IssueDataSource = UICollectionViewDiffableDataSource<Section, Issue>
    
    // MARK:- Life Cycle Methos
    override func viewDidLoad() {
        super.viewDidLoad()
        configureNavigationBar(navigationBar)
        configureCollectionView()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        dataSourceUpdateFromNetwork()
    }
    
    // MARK:- Methods
    
    private func configureCollectionView() {
        collectionView.collectionViewLayout = createLayout()
        collectionView.delegate = self
        collectionView.allowsMultipleSelectionDuringEditing = true
    }
    
    private func createDataSource() -> IssueDataSource {
        let dataSource = IssueDataSource(
            collectionView: collectionView,
            cellProvider: { (collectionView, indexPath, issue) ->
                UICollectionViewCell? in
                let cell = collectionView.dequeueReusableCell(
                    withReuseIdentifier: "IssueCollectionViewCell",
                    for: indexPath) as? IssueCollectionViewCell
                cell?.accessories = self.accessoriesForListCellItem(issue)
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
        let configuration = UICollectionLayoutListConfiguration(appearance: .plain)
        
        return UICollectionViewCompositionalLayout.list(using: configuration)
    }
    
    private func accessoriesForListCellItem(_ issue: Issue) -> [UICellAccessory] {
        let ischecked = checkedIssues.contains(issue)
        var accessories = [UICellAccessory]()
        let accessoryImage: UIImageView
        switch ischecked {
        case true:
            accessoryImage = UIImageView(image: UIImage(systemName: "checkmark.circle.fill"))
        case false:
            accessoryImage = UIImageView(image: UIImage(systemName: "circle"))
        }
        accessories.append(.customView(configuration: .init(customView: accessoryImage, placement: .leading())))
        return accessories
    }

}

extension IssueEditViewController: UICollectionViewDelegate {
    
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        guard let cell = collectionView.cellForItem(at: indexPath) as? UICollectionViewListCell,
              cell.isSelected == true,
              let issue = self.dataSource.itemIdentifier(for: indexPath) else { return }
        if checkedIssues.contains(issue) {
            checkedIssues.remove(issue)
        } else {
            checkedIssues.insert(issue)
        }
        cell.accessories = accessoriesForListCellItem(issue)
        headerLabel.text = "\(checkedIssues.count)개 선택"
    }
    
}
