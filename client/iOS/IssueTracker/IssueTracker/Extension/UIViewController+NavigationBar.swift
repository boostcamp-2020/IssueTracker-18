//
//  UIViewController+NavigationBar.swift
//  IssueTracker
//
//  Created by 류연수 on 2020/11/09.
//

import UIKit

extension UIViewController {
    
    func configureNavigationBar(_ navigationBar: UINavigationBar?) {
        navigationBar?.shadowImage = UIImage()
        navigationBar?.barTintColor = .systemBackground
        navigationBar?.isTranslucent = false
    }
    
    func configureUndoNavigationBar(_ navigationBar: UINavigationBar?) {
        navigationBar?.shadowImage = nil
        navigationBar?.barTintColor = .none
        navigationBar?.isTranslucent = true
    }
}
