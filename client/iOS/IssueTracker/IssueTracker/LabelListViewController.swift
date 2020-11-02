//
//  LabelListViewController.swift
//  IssueTracker
//
//  Created by A on 2020/11/03.
//

import UIKit

class LabelListViewController: UIViewController {

    // MARK: - @IBOutlet Properties
    @IBOutlet weak var navigationBar: UINavigationBar!
    
    // MARK: - Life Cycle Methods
    override func viewDidLoad() {
        super.viewDidLoad()
        configureNavigationBar()
    }
    
    private func configureNavigationBar() {
        navigationBar.shadowImage = UIImage()
        navigationBar.barTintColor = .systemBackground
        navigationBar.isTranslucent = false
        navigationBar.topItem?.title = ""
    }

}
