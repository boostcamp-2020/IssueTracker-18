//
//  IssueDetailViewController.swift
//  IssueTracker
//
//  Created by 류연수 on 2020/11/09.
//

import UIKit

class IssueDetailViewController: UIViewController {

    // MARK:- Properties
    var issue: Issue?
    
    // MARK:- Life Cycle Methods
    override func viewDidLoad() {
        super.viewDidLoad()
        configureNavigationBar()
    }
    
    private func configureNavigationBar() {
        guard let navigationBar = navigationController?.navigationBar else { return }
        configureUndoNavigationBar(navigationBar)
        navigationBar.topItem?.title = ""
        navigationItem.rightBarButtonItem = UIBarButtonItem(title: "Edit", style: .plain, target: self, action: #selector(editTabbed))
    }
    
    @objc private func editTabbed() {
        
    }

}
