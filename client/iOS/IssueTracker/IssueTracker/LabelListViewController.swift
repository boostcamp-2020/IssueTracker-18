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
 
    

    var labels = [Label(id: 1, title: "feat", description: "기능에 대한 레이블 입니다dfafafaafafadfah", color: "ㅇㅇ"),
                  Label(id: 2, title: "bug", description: "수정할 버그에 대한 레이블 입니다", color: "ㅇㅇ")]
    
    // MARK: - Life Cycle Methods
    override func viewDidLoad() {
        super.viewDidLoad()
        configureNavigationBar()
    }
    
    private func configureNavigationBar() {
        navigationBar.shadowImage = UIImage()
        navigationBar.barTintColor = .systemBackground
        navigationBar.isTranslucent = false
    }
    
  

}
