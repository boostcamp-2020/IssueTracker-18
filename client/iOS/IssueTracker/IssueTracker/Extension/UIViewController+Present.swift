//
//  UIViewController+Present.swift
//  IssueTracker
//
//  Created by 류연수 on 2020/11/03.
//

import UIKit

extension UIViewController {
    func presentLikePopUp(targetVC: UIViewController) {
        targetVC.modalPresentationStyle = .overCurrentContext
        targetVC.modalTransitionStyle = .crossDissolve
        present(targetVC, animated: true, completion: nil)
    }
}
