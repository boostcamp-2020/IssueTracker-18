//
//  LabelListViewController.swift
//  IssueTracker
//
//  Created by A on 2020/11/03.
//!
import UIKit

class LabelListViewController: UIViewController {

    // MARK: - @IBOutlet Properties
    @IBOutlet weak var navigationBar: UINavigationBar!
    @IBOutlet weak var collectionView: UICollectionView!
    
    @IBAction func showPopUp(_ sender: UIBarButtonItem) {
        presentAsPopUp(senderType: .label) { [weak self] in
            self?.dataSourceUpdateFromNetwork()
        }
    }
    
    // MARK: - Properties
    var dataSource: UICollectionViewDiffableDataSource<Section, Label>!
    private let api = NetworkManager()
    
    // MARK: - Life Cycle Methods
    override func viewDidLoad() {
        super.viewDidLoad()
        configureNavigationBar()
        configureCollectionView()
        configureDataSource()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        dataSourceUpdateFromNetwork()
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
        let cellRegistration = UICollectionView.CellRegistration<LabelListCell, Label> { (cell, indexPath, label) in
            cell.updateWithLabel(label)
            cell.accessories = [.disclosureIndicator()]
        }
        
        dataSource = UICollectionViewDiffableDataSource<Section, Label>(collectionView: collectionView, cellProvider: { (collectionView, indexPath, label) -> UICollectionViewCell? in
            return collectionView.dequeueConfiguredReusableCell(using: cellRegistration, for: indexPath, item: label)
        })
    }
    
    private func createLayout() -> UICollectionViewLayout {
        var configuration = UICollectionLayoutListConfiguration(appearance: .plain)
        configuration.trailingSwipeActionsConfigurationProvider = { [weak self]
            (indexPath) in
            guard let self = self else { return nil }
            guard let label = self.dataSource.itemIdentifier(for: indexPath) else {
                return nil
            }
            return self.trailingSwipeActionConfigurationForListCellItem(label)
        }
        return UICollectionViewCompositionalLayout.list(using: configuration)
    }
    
    private func dataSourceUpdateFromNetwork() {
        let api = NetworkManager()
        let parameters: Label? = nil
        api.request(type: RequestType(endPoint: "label", method: .get, parameters: parameters)) { [self] (data: [Label]) in
            var snapshot = NSDiffableDataSourceSnapshot<Section, Label>()
            snapshot.appendSections([.main])
            snapshot.appendItems(data)
            dataSource.apply(snapshot)
        }
    }
    
    func trailingSwipeActionConfigurationForListCellItem(_ label: Label) -> UISwipeActionsConfiguration? {
        let closeAction = UIContextualAction(style: .normal, title: "Close") {
            [weak self] (_, _, completion) in
            guard let self = self else {
                completion(false)
                return
            }
            
            completion(true)
        }
        closeAction.backgroundColor = .systemGreen
        
        let deleteAction = UIContextualAction(style: .normal, title: "Delete") {
            [weak self] (_, _, completion) in
            guard let self = self else {
                completion(false)
                return
            }
            let parameters: Label? = nil
            let requestType = RequestType(endPoint: "label", method: .delete, parameters: parameters, id: label.id)
            print(label.id)
            self.api.request(type: requestType) { [weak self] (data: DeleteResponse) in
                print(data)
                self?.dataSourceUpdateFromNetwork()
            }
            completion(true)
        }
        deleteAction.backgroundColor = .systemRed
        return UISwipeActionsConfiguration(actions: [deleteAction, closeAction])
    }
}

extension LabelListViewController: UICollectionViewDelegate {
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        collectionView.deselectItem(at: indexPath, animated: true)
    }
}
