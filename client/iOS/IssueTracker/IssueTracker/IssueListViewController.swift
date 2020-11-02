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
    
    var dataSource: UICollectionViewDiffableDataSource<Section, Issue>!
    var array = [Issue(id: "a", title: "a", description: "a", isOpen: true, createdAt: "a", updatedAt: "A", issuer: User(name: "연수", email: "a", image_url: "a"), assignees: nil, labels: nil, milestone: nil), Issue(id: "bb", title: "bbb", description: "bb", isOpen: true, createdAt: "a", updatedAt: "A", issuer: User(name: "연수", email: "a", image_url: "a"), assignees: nil, labels: nil, milestone: nil)]
    
    // MARK: - Life Cycle Methods
    override func viewDidLoad() {
        super.viewDidLoad()
        configureNavigationBar()
        configureNewIssueButton()
        configureCollectionView()
        configureDataSource()
        applyInitialSnapshots()
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
    
    private func configureDataSource() {
        let cellRegistration = UICollectionView.CellRegistration<UICollectionViewListCell, Issue> { (cell, indexPath, issue) in
            var contentConfiguration = UIListContentConfiguration.valueCell()
            contentConfiguration.text = issue.title
            contentConfiguration.secondaryText = issue.description
            cell.contentConfiguration = contentConfiguration
            cell.accessories = [.checkmark()]
        }
        
        dataSource = UICollectionViewDiffableDataSource<Section, Issue>(collectionView: collectionView, cellProvider: { (collectionView, indexPath, issue) -> UICollectionViewCell? in
            return collectionView.dequeueConfiguredReusableCell(using: cellRegistration, for: indexPath, item: issue)
        })
    }
    
    private func applyInitialSnapshots() {
        var snapshot = NSDiffableDataSourceSnapshot<Section, Issue>()
        snapshot.appendSections([.main])
        snapshot.appendItems(array)
        dataSource.apply(snapshot)
    }
    
    private func createLayout() -> UICollectionViewLayout {
        let configuration = UICollectionLayoutListConfiguration(appearance: .plain)
        return UICollectionViewCompositionalLayout.list(using: configuration)
    }
    
}
    
