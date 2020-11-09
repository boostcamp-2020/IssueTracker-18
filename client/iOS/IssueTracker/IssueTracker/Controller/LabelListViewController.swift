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
        let configuration = UICollectionLayoutListConfiguration(appearance: .plain)
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
}

extension LabelListViewController: UICollectionViewDelegate {
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        collectionView.deselectItem(at: indexPath, animated: true)
    }
}
