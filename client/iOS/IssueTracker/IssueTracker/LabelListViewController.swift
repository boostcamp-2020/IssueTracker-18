//
//  LabelListViewController.swift
//  IssueTracker
//
//  Created by A on 2020/11/03.
//!
import UIKit

class LabelListViewController: UIViewController, UICollectionViewDelegate {

    // MARK: - @IBOutlet Properties
    @IBOutlet weak var navigationBar: UINavigationBar!
    @IBOutlet weak var collectionView: UICollectionView!
    
    // MARK: - Properties
    var labels = [Label(id: 1, title: "feat", description: "기능에 대한 레이블 입니다dfafafaafafadfah", color: "ㅇㅇ"),
                  Label(id: 2, title: "bug", description: "수정할 버그에 대한 레이블 입니다", color: "ㅇㅇ")]
    var dataSource: UICollectionViewDiffableDataSource<Section, Label>!
    
    // MARK: - Life Cycle Methods
    override func viewDidLoad() {
        super.viewDidLoad()
        configureNavigationBar()
        configureCollectionView()
        configureDataSource()
        applyInitialSnapshots()
    }
    
    private func configureNavigationBar() {
        navigationBar.shadowImage = UIImage()
        navigationBar.barTintColor = .systemBackground
        navigationBar.isTranslucent = false
    }
    
    private func configureCollectionView() {
        collectionView.collectionViewLayout = createLayout()
        collectionView.delegate = self
    }
    
    private func configureDataSource() {
        let cellRegistration = UICollectionView.CellRegistration<UICollectionViewListCell, Label> { (cell, indexPath, label) in
            var contentConfiguration = UIListContentConfiguration.subtitleCell()
            contentConfiguration.text = label.title
            contentConfiguration.secondaryText = label.description
            cell.contentConfiguration = contentConfiguration
            cell.accessories = [.disclosureIndicator()]
        }
        
        dataSource = UICollectionViewDiffableDataSource<Section, Label>(collectionView: collectionView, cellProvider: { (collectionView, indexPath, label) -> UICollectionViewCell? in
            return collectionView.dequeueConfiguredReusableCell(using: cellRegistration, for: indexPath, item: label)
        })
    }
    
    private func applyInitialSnapshots() {
        var snapshot = NSDiffableDataSourceSnapshot<Section, Label>()
        snapshot.appendSections([.main])
        snapshot.appendItems(labels)
        dataSource.apply(snapshot)
    }
    
    private func createLayout() -> UICollectionViewLayout {
        let configuration = UICollectionLayoutListConfiguration(appearance: .plain)
        return UICollectionViewCompositionalLayout.list(using: configuration)
    }
}
