//
//  UIViewController+Present.swift
//  IssueTracker
//
//  Created by 류연수 on 2020/11/03.
//

import UIKit

extension UIViewController {
    
    func presentLikePopUp(senderType: BadgeType, badgeData: Badgeable? = nil) {
        guard let popUpVC = self.storyboard?.instantiateViewController(withIdentifier: "PopUpViewController") as? PopUpViewController else { return }
        popUpVC.badgeType = senderType
        popUpVC.modalPresentationStyle = .overCurrentContext
        popUpVC.modalTransitionStyle = .crossDissolve
        popUpVC.badgeData = badgeData
        present(popUpVC, animated: true, completion: nil)
    }
    
}
