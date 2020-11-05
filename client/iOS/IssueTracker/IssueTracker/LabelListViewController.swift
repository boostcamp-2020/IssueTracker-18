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
    
    @IBAction func showPopUp(_ sender: UIBarButtonItem) {
        guard let popUpVC = self.storyboard?.instantiateViewController(withIdentifier: "PopUpViewController") as? PopUpViewController else { return }
        presentAnotherViewController(targetVC: popUpVC)
    }
    
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
    
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        collectionView.deselectItem(at: indexPath, animated: true)
    }
    
    private func dataSourceUpdateFromNetwork() {
        NetworkManager.getData(from: "label") { [self] (data) in
            do {
                let decodedData = try JSONDecoder().decode([Label].self, from: data)
                var snapshot = NSDiffableDataSourceSnapshot<Section, Label>()
                snapshot.appendSections([.main])
                snapshot.appendItems(decodedData)
                dataSource.apply(snapshot)
            }
            catch {
                print(error)
            }
        }
    }
    
}


