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
    var badgeData: Badgeable?
    
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
        
        configureTextField()
        configureButton()
    }
    
    private func configureTextField() {
        guard let popUpView = popUpView else { return }
        popUpView.titleTextField.delegate = self
        popUpView.secondTextField.delegate = self
        popUpView.lastTextField.delegate = self
    }
    
    private func configureButton() {
        guard let popUpView = popUpView else { return }
        popUpView.saveButton.addTarget(self, action: #selector(saveTexts), for: .touchUpInside)
        popUpView.cancelButton.addTarget(self, action: #selector(dismissSelf), for: .touchUpInside)
        popUpView.resetButton.addTarget(self, action: #selector(resetTextField), for: .touchUpInside)
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
    
    private func configureBadgeData(_ popUpView: PopUpView,
                                    _ title: String,
                                    _ secondText: String,
                                    _ lastText: String) {
        guard let badgeType = badgeType else { return }
        switch badgeType {
        case .label:
            badgeData = createLabel(popUpView, title, secondText, lastText)
        case .milestone:
            badgeData = createMilestone(popUpView, title, secondText, lastText)
        }
    }
    
    private func createMilestone(_ popUpView: PopUpView,
                                 _ title: String,
                                 _ secondText: String,
                                 _ lastText: String) -> Milestone {
        guard let badgeData = badgeData as? Milestone else {
            return Milestone(id: -1, title: title, description: lastText, isOpen: true, dueDate: lastText, createdAt: Date().convertToString(), updatedAt: Date().convertToString())
        }
        return Milestone(id: badgeData.id,title: title, description: lastText, isOpen: true, dueDate: lastText, createdAt: badgeData.createdAt, updatedAt: Date().convertToString())
    }
    
    private func createLabel(_ popUpView: PopUpView,
                             _ title: String,
                             _ secondText: String,
                             _ lastText: String) -> Label {
        guard let badgeData = badgeData as? Label else {
            return Label(id: -1, title: title, description: secondText, color: lastText)
        }
        return Label(id: badgeData.id, title: title, description: secondText, color: lastText)
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

extension PopUpViewController: UITextFieldDelegate {
    
    func textFieldDidBeginEditing(_ textField: UITextField) {
        textField.configurePlaceholderColor(color: UIColor.systemGray)
    }
    
}
