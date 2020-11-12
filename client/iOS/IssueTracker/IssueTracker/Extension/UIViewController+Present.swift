//
//  UIViewController+Present.swift
//  IssueTracker
//
//  Created by 류연수 on 2020/11/03.
//

import UIKit

extension UIViewController {
    
    func presentAsPopUp(senderType: BadgeType, badgeData: Badgeable? = nil, completion: @escaping () -> Void) {
        guard let popUpVC = self.storyboard?.instantiateViewController(withIdentifier: "PopUpViewController") as? PopUpViewController else { return }
        popUpVC.badgeType = senderType
        popUpVC.modalPresentationStyle = .overCurrentContext
        popUpVC.modalTransitionStyle = .crossDissolve
        popUpVC.badgeData = badgeData
        popUpVC.completion = completion
        present(popUpVC, animated: true, completion: nil)
    }
    
    func createAlert(completion: @escaping ((Any?) -> Void)) {
        let alert = UIAlertController(title: "삭제하시겠습니까?", message: "이 작업은 되돌릴 수 없습니다.", preferredStyle: UIAlertController.Style.alert)
        let okAction = UIAlertAction(title: "OK", style: .default, handler : nil)
        let cancel = UIAlertAction(title: "cancel", style: .cancel, handler : nil)
        alert.addAction(cancel)
        alert.addAction(okAction)
        present(alert, animated: true, completion: nil)
    }
    
}
