//
//  MilestonePopUpViewController.swift
//  IssueTracker
//
//  Created by 류연수 on 2020/11/03.
//

import UIKit
import AudioToolbox

class PopUpViewController: UIViewController {
    
    @IBOutlet weak var popUpViewWrapper: UIView!
    var popUpView: PopUpView?
    var badgeType: BadgeType?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        configurePopUpView()

    }
    
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        view.endEditing(true)
    }
    
    private func configurePopUpView() {
        guard let popUpViewWarpper = self.popUpViewWrapper as? PopUpViewWrapper else { return }
        popUpView = popUpViewWarpper.contentView
        popUpView?.saveButton.addTarget(self, action: #selector(saveTexts), for: .touchUpInside)
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
    
    @objc private func saveTexts() {
        guard let popUpView = popUpView else { return }
        let title = popUpView.titleTextField.text ?? ""
        let secondText = popUpView.secondTextField.text ?? ""
        let lastText = popUpView.lastTextField.text ?? ""
        
        if( configureVibrateAlert(popUpView, title, secondText, lastText) ) {
            return
        }
    }
    
    private func configureVibrateAlert(_ popUpView: PopUpView,
                                       _ title: String,
                                       _ secondText: String,
                                       _ lastText: String) -> Bool {
        if(title.isEmpty) {
            popUpView.titleTextField.configurePlaceholderColor(color: UIColor.systemRed)
        }
        if(secondText.isEmpty) {
            popUpView.secondTextField.configurePlaceholderColor(color: UIColor.systemRed)
        }
        if(lastText.isEmpty) {
            popUpView.lastTextField.configurePlaceholderColor(color: UIColor.systemRed)
        }
        if(title.isEmpty || secondText.isEmpty || lastText.isEmpty) {
            AudioServicesPlaySystemSound(kSystemSoundID_Vibrate)
            return true
        }
        return false
    }
    
}
