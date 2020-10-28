//
//  IssueListViewController.swift
//  IssueTracker
//
//  Created by A on 2020/10/28.
//

import UIKit

class IssueListViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        setNavigationBar()
    }
    
    private func setNavigationBar() {
        self.navigationController?.navigationBar.shadowImage = UIImage()
        self.navigationController?.navigationBar.barTintColor = .white
        self.navigationController?.navigationBar.isTranslucent = false
        
    }
}
