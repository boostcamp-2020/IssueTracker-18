//
//  IssueDetailViewController.swift
//  IssueTracker
//
//  Created by 류연수 on 2020/11/09.
//

import UIKit

class IssueDetailViewController: UIViewController, UICollectionViewDelegate {

    // MARK:- @IBOutlet Properties
    @IBOutlet weak var collectionView: UICollectionView!
    
    // MARK:- Properties
    var issue: Issue?
    private lazy var dataSource = createDataSource()
    
    //MARK: - Value Types
    typealias CommentDataSource = UICollectionViewDiffableDataSource<Section, Comment>
    
    // MARK:- Life Cycle Methods
    override func viewDidLoad() {
        super.viewDidLoad()
        configureCollectionView()
        configureNavigationBar()
        applyInitialSnapshots()
    }
    
    private func configureCollectionView() {
        collectionView.collectionViewLayout = createLayout()
        collectionView.delegate = self
    }
    
    private func createLayout() -> UICollectionViewLayout {
        let sectionProvider = { (sectionIndex: Int, layoutEnvironment: NSCollectionLayoutEnvironment) -> NSCollectionLayoutSection? in
            var configuration = UICollectionLayoutListConfiguration(appearance: .plain)
            configuration.backgroundColor = UIColor.systemGray3
            let section = NSCollectionLayoutSection.list(using: configuration, layoutEnvironment: layoutEnvironment)
            section.interGroupSpacing = 10
            return section
        }
        
        return UICollectionViewCompositionalLayout(sectionProvider: sectionProvider)
    }
    
    private func createDataSource() -> CommentDataSource {
        let dataSource = CommentDataSource(
            collectionView: collectionView,
            cellProvider: { (collectionView, indexPath, comment) ->
                UICollectionViewCell? in
                let cell = collectionView.dequeueReusableCell(
                    withReuseIdentifier: "CommentCollectionViewCell",
                    for: indexPath) as? CommentCollectionViewCell
                cell?.contents.text = comment.content
                cell?.updatedAt.text = Date().timeAgoDisplay()
                return cell
            })
        
        return dataSource
    }
    
    private func applyInitialSnapshots() {
        DispatchQueue.global(qos: .background).async {
            var snapshot = NSDiffableDataSourceSnapshot<Section, Comment>()
            snapshot.appendSections([.main])
            guard let comments = self.issue?.comments else { return }
            snapshot.appendItems(comments)
            self.dataSource.apply(snapshot, animatingDifferences: false)
        }
    }
    
    private func configureNavigationBar() {
        guard let navigationBar = navigationController?.navigationBar else { return }
        configureUndoNavigationBar(navigationBar)
        navigationBar.topItem?.title = ""
        navigationItem.rightBarButtonItem = UIBarButtonItem(title: "Edit", style: .plain, target: self, action: #selector(editTabbed))
    }
    
    @objc private func editTabbed() {
        
    }
    
    private func configureCommentCell() {
        
    }

}
