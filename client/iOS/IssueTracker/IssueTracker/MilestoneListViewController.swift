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
    @IBOutlet weak var badgeViewWrapper: UIView!
    @IBOutlet weak var collectionView: UICollectionView!
    
    @IBAction func showPopUp(_ sender: UIBarButtonItem) {
        guard let popUpVC = self.storyboard?.instantiateViewController(withIdentifier: "PopUpViewController") as? PopUpViewController else { return }
        presentAnotherViewController(targetVC: popUpVC)
    }
    
    // MARK: - Properties
    private lazy var dataSource = createDataSource()
    private var milestones = [
        Milestone(id: 1, title: "a", description: "asaaaaaaaaaaaaasaaaaaaaaaaaaaaaaaaaa", isOpen: true, dueDate: nil, createdAt: "a", updatedAt: "a"),
        Milestone(id: 2, title: "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", description: "b", isOpen: true, dueDate: nil, createdAt: "a", updatedAt: "a"),
        Milestone(id: 3, title: "c", description: "ccccccccccccccccccccccccccccccccc", isOpen: true, dueDate: nil, createdAt: "a", updatedAt: "a")]
    
    //MARK: - Value Types
    typealias MilestoneDataSource = UICollectionViewDiffableDataSource<Section, Milestone>
    
    // MARK: - Life Cycle Methods
    override func viewDidLoad() {
        super.viewDidLoad()
        configureNavigationBar()
        configureBadgeView()
        configureCollectionView()
        applyInitialSnapshots()
    }
    
    // MARK: - Methods
    private func configureNavigationBar() {
        navigationBar.shadowImage = UIImage()
        navigationBar.barTintColor = .systemBackground
        navigationBar.isTranslucent = false
    }
    
    private func configureBadgeView() {
        guard let badgeViewWrapper = self.badgeViewWrapper as? BadgeViewWrapper else { return }
        let badgeView = badgeViewWrapper.contentView
        badgeView.configureView(kind: .milestone)
        badgeView.configureLabel(with: "Week 3 마감!")
    }
    
    private func configureCollectionView() {
        collectionView.collectionViewLayout = createLayout()
        collectionView.delegate = self
    }
    
    private func createDataSource() -> MilestoneDataSource {
        let dataSource = MilestoneDataSource(
          collectionView: collectionView,
          cellProvider: { (collectionView, indexPath, milestone) ->
            UICollectionViewCell? in
            // 2
            let cell = collectionView.dequeueReusableCell(
              withReuseIdentifier: "MilestoneCollectionViewCell",
              for: indexPath) as? MilestoneCollectionViewCell
            cell?.title.text = milestone.title
            cell?.descriptText.text = milestone.description
            cell?.title.configureView(kind: .milestone)
            return cell
        })
        
        return dataSource
    }
    
    private func createLayout() -> UICollectionViewLayout {
        let configuration = UICollectionLayoutListConfiguration(appearance: .plain)
        return UICollectionViewCompositionalLayout.list(using: configuration)
    }
    
    private func applyInitialSnapshots() {
        var snapshot = NSDiffableDataSourceSnapshot<Section, Milestone>()
        snapshot.appendSections([.main])
        snapshot.appendItems(milestones)
        dataSource.apply(snapshot)
    }
    
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        collectionView.deselectItem(at: indexPath, animated: true)
    }
    
    enum Section {
      case main
    }
}
