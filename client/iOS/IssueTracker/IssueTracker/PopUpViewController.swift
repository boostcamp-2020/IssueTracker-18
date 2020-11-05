//
//  MilestonePopUpViewController.swift
//  IssueTracker
//
//  Created by 류연수 on 2020/11/03.
//

import UIKit

class PopUpViewController: UIViewController {
    
    @IBOutlet weak var popUpViewWrapper: UIView!
    var popUpView: PopUpView?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        configurePopUpView()

    }
    
    private func configurePopUpView() {
        guard let popUpViewWarpper = self.popUpViewWrapper as? PopUpViewWrapper else { return }
        popUpView = popUpViewWarpper.contentView
        popUpView?.saveButton.addTarget(self, action: #selector(dismissSelf), for: .touchUpInside)
        popUpView?.cancelButton.addTarget(self, action: #selector(dismissSelf), for: .touchUpInside)
        popUpView?.resetButton.addTarget(self, action: #selector(resetTextField), for: .touchUpInside)
        
    }
    
    @objc private func dismissSelf() {
        self.dismiss(animated: false, completion: nil)
    }
    
    @objc private func resetTextField() {
        popUpView?.titleTextField.text = ""
        popUpView?.secondTextField.text = ""
        popUpView?.lastTextField.text = ""
    }
    
}
