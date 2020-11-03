//
//  LabelListViewController.swift
//  IssueTracker
//
//  Created by A on 2020/11/03.
//

import UIKit

class LabelListViewController: UIViewController, UICollectionViewDelegate {

    // MARK: - @IBOutlet Properties
    @IBOutlet weak var navigationBar: UINavigationBar!
    @IBOutlet weak var collectionView: UICollectionView!
    
    @IBAction func toucedPlusButton(_ sender: UIBarButtonItem) {
        collectionView.isEditing = !collectionView.isEditing
        
//        if let currentIndexPath = self.dataSource.indexPath(for: item) {
//            if let cell = self.collectionView.cellForItem(at: currentIndexPath) as? UICollectionViewListCell {
//                UIView.animate(withDuration: 0.2) {
//                    cell.accessories = self.accessoriesForListCellItem(item)
//                }
//            }
//        }
//        collectionView.visibleCells.forEach { cell in
//            if cell == cell as? UICollectionViewListCell {
//                cell.accessoty
//            }
//
//        }
    }
    
    // MARK: - Properties
    var dataSource: UICollectionViewDiffableDataSource<Section, Label>!
    var labels = [Label(title: "feat", description: "기능에 대한 레이블 입니다dfafafaafafadfah", color: "ㅇㅇ"),
                  Label(title: "bug", description: "수정할 버그에 대한 레이블 입니다", color: "ㅇㅇ")]
    
    // MARK: - Life Cycle Methods
    override func viewDidLoad() {
        super.viewDidLoad()
        configureNavigationBar()
        configureNavigationBar()
        configureDataSource()
        applyInitialSnapshot()
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
            var contentConfiguration = UIListContentConfiguration.valueCell()
            contentConfiguration.text = label.title
            contentConfiguration.secondaryText = label.description
            cell.contentConfiguration = contentConfiguration
            cell.accessories = [.disclosureIndicator()]
            
            let star = UIImageView(image: UIImage(systemName: "star.fill"))
            let customAceessory: UICellAccessory = .customView(configuration: .init(customView: star, placement: .leading()))
            cell.accessories.append(customAceessory)
            
        }
        
        dataSource = UICollectionViewDiffableDataSource<Section, Label>(collectionView: collectionView, cellProvider: { (collectionView, indexPath, label) -> UICollectionViewCell? in
            return collectionView.dequeueConfiguredReusableCell(using: cellRegistration, for: indexPath, item: label)
        })
        
        let headerRegistration = UICollectionView.SupplementaryRegistration(elementKind: <#T##String#>, handler: <#T##UICollectionView.SupplementaryRegistration<UICollectionReusableView>.Handler##UICollectionView.SupplementaryRegistration<UICollectionReusableView>.Handler##(UICollectionReusableView, String, IndexPath) -> Void#>)
    }
    
    private func applyInitialSnapshot() {
        var snapshot = NSDiffableDataSourceSnapshot<Section, Label>()
        snapshot.appendSections([.main])
        snapshot.appendItems(labels)
        dataSource.apply(snapshot)
    }
    
    private func createLayout() -> UICollectionViewLayout {
        var configuration = UICollectionLayoutListConfiguration(appearance: .plain)
        configuration.headerMode = .supplementary
        return UICollectionViewCompositionalLayout.list(using: configuration)
    }

}
