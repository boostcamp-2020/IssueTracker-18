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
    var completion: (() -> Void)?
    
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
        guard let badgeType = self.badgeType else { return }
        if badgeType == .label {
            configureLabelView()
        }
        configureTextField()
        configureButton()
    }
    
    private func configureLabelView() {
        guard let popUpView = popUpView else {
            return
        }
        popUpView.secondLabel.text = "설명"
        popUpView.thirdLabel.text = "색상"
        popUpView.secondTextField.placeholder = "설명을 작성해 주세요"
        popUpView.thirdTextField.placeholder = "색상 코드를 입력해 주세요"
        popUpView.colorView.isHidden = false
        popUpView.randomButton.isHidden = false
    }
    
    private func configureTextField() {
        guard let popUpView = popUpView else { return }
        popUpView.titleTextField.delegate = self
        popUpView.secondTextField.delegate = self
        popUpView.thirdTextField.delegate = self
    }
    
    private func configureButton() {
        guard let popUpView = popUpView else { return }
        popUpView.saveButton.addTarget(self, action: #selector(saveTexts), for: .touchUpInside)
        popUpView.cancelButton.addTarget(self, action: #selector(dismissSelf), for: .touchUpInside)
        popUpView.resetButton.addTarget(self, action: #selector(resetTextField), for: .touchUpInside)
        popUpView.randomButton.addTarget(self, action: #selector(setRandomColor), for: .touchUpInside)
    }
    
    @objc private func dismissSelf() {
        completion?()
        self.dismiss(animated: false, completion: nil)
    }
    
    @objc private func resetTextField() {
        popUpView?.titleTextField.text = ""
        popUpView?.secondTextField.text = ""
        popUpView?.thirdTextField.text = ""
    }
    
    @objc private func saveTexts() {
        guard let popUpView = popUpView else { return }
        let title = popUpView.titleTextField.text ?? ""
        let secondText = popUpView.secondTextField.text ?? ""
        let lastText = popUpView.thirdTextField.text ?? ""
        
        if( configureVibrateAlert(popUpView, title, secondText, lastText) ) {
            return
        }
        configureBadgeData(popUpView, title, secondText, lastText)
        dismissSelf()
    }
    
    @objc private func setRandomColor() {
        guard let popUpView = popUpView else { return }
        let color = UIColor.random
        popUpView.colorView.backgroundColor = color
        popUpView.thirdTextField.text = "\(color.toHexString())"
    }
    
    private func dataSourceUpdateFromNetwork<T: Codable> (data: RequestType<T>) {
        let api = NetworkManager()
        api.request(type: RequestType(endPoint: data.endPoint, method: .post, parameters: data.parameters)) { (data: [T]) in
            print(data)
        }
    }
    
    private func configureBadgeData(_ popUpView: PopUpView,
                                    _ title: String,
                                    _ secondText: String,
                                    _ lastText: String) {
        guard let badgeType = badgeType else { return }
        switch badgeType {
        case .label:
            let label = createLabel(popUpView, title, secondText, lastText)
            dataSourceUpdateFromNetwork(data: RequestType(endPoint: "label", method: .post, parameters: label))
        case .milestone:
            let milestone = createMilestone(popUpView, title, secondText, lastText)
            dataSourceUpdateFromNetwork(data: RequestType(endPoint: "milestone", method: .post, parameters: milestone))
        }
    }
    
    private func createMilestone(_ popUpView: PopUpView,
                                 _ title: String,
                                 _ secondText: String,
                                 _ lastText: String) -> Milestone {
        guard let badgeData = badgeData as? Milestone else {
            return Milestone(id: nil, title: title, description: lastText, isOpen: true, dueDate: secondText)
        }
        return Milestone(id: badgeData.id,title: title, description: lastText, isOpen: true, dueDate: lastText)
    }
    
    private func createLabel(_ popUpView: PopUpView,
                             _ title: String,
                             _ secondText: String,
                             _ lastText: String) -> Label {
        guard let badgeData = badgeData as? Label else {
            return Label(id: nil, title: title, description: secondText, color: lastText)
        }
        return Label(id: badgeData.id, title: title, description: secondText, color: lastText)
    }
    
    private func configureVibrateAlert(_ popUpView: PopUpView,
                                       _ title: String,
                                       _ secondText: String,
                                       _ thirdText: String) -> Bool {
        var needAlert = false
        if(title.isEmpty) {
            popUpView.titleTextField.configurePlaceholderColor(color: UIColor.systemRed)
            needAlert = true
        }
        if(secondText.isEmpty || isInvalidDateForm(text: secondText)) {
            popUpView.secondTextField.configurePlaceholderColor(color: UIColor.systemRed)
            popUpView.secondTextField.text = ""
            needAlert = true
        }
        if(thirdText.isEmpty || isInvalidColorForm(color: thirdText)) {
            popUpView.thirdTextField.configurePlaceholderColor(color: UIColor.systemRed)
            popUpView.thirdTextField.text = ""
            needAlert = true
        }
        if(needAlert) {
            AudioServicesPlaySystemSound(kSystemSoundID_Vibrate)
            return true
        }
        return false
    }
    
    private func isInvalidDateForm(text: String) -> Bool {
        if badgeType == BadgeType.label { return false }
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd"
        guard let _ = dateFormatter.date(from: text) else { return true }
        return false
    }
    
    private func isInvalidColorForm(color: String) -> Bool {
        if badgeType == BadgeType.milestone { return false }
        let countRegEx = ".{7}$"
        let countPredicate = NSPredicate(format:"SELF MATCHES %@", countRegEx)
        
        let ColorRegEx = "^#[a-f0-9A-F]+"
        let colorPredicate = NSPredicate(format:"SELF MATCHES %@", ColorRegEx)
        
        return !countPredicate.evaluate(with: color) || !colorPredicate.evaluate(with: color)
    }
    
}

extension PopUpViewController: UITextFieldDelegate {
    
    func textFieldDidBeginEditing(_ textField: UITextField) {
        textField.configurePlaceholderColor(color: UIColor.systemGray)
    }
    
}
