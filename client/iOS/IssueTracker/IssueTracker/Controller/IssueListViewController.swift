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
                cell?.descriptionLabel.text = issue.firstComment.content
                cell?.milestoneBadgeLabel.text = issue.milestone?.title
                cell?.milestoneBadgeLabel.configureView(kind: .milestone)
                cell?.labelBadgeLabel.text = issue.labels?.first?.title
                cell?.labelBadgeLabel.configureView(kind: .label)
                return cell
            })
        
        return dataSource
    }
    
    private func dataSourceUpdateFromNetwork() {
        NetworkManager.getData(from: "issue") { [self] (data) in
            do {
                let decodedData = try JSONDecoder().decode([Issue].self, from: data)
                var snapshot = NSDiffableDataSourceSnapshot<Section, Issue>()
                snapshot.appendSections([.main])
                snapshot.appendItems(decodedData)
                dataSource.apply(snapshot)
            }
            catch {
                print(error)
            }
        }
    }
    
    private func createLayout() -> UICollectionViewLayout {
        let configuration = UICollectionLayoutListConfiguration(appearance: .plain)
        return UICollectionViewCompositionalLayout.list(using: configuration)
    }
    
}
    
