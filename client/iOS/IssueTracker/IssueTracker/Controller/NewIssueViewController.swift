//
//  NewIssueViewController.swift
//  IssueTracker
//
//  Created by A on 2020/11/10.
//

import UIKit
import AudioToolbox

class NewIssueViewController: UIViewController {
    
    // MARK: - @IBOutlet Properties
    @IBOutlet weak var titleTextField: UITextField!
    @IBOutlet weak var segmentedControl:UISegmentedControl!
    @IBOutlet weak var contentTextView: UITextView!
    @IBOutlet weak var addNewIssueButton: UIButton!
    
    // MARK: - @IBAction
    @IBAction func toucedCancelButton(_ sender: UIBarButtonItem) {
        dismiss(animated: true, completion: nil)
    }
    
    var completion: (() -> Void)?
    
    // MARK: - Life Cycle Methods
    override func viewDidLoad() {
        super.viewDidLoad()
        contentTextView.delegate = self
        addNewIssueButton.addTarget(self, action: #selector(postNewIssue), for: .touchUpInside)
    }
    
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        view.endEditing(true)
    }
     
    // MARK: - Methods
    @objc private func postNewIssue() {
        let title = titleTextField.text ?? ""
        if configureVibrateAlert(title) { return }
        let newIssue = createIssue(title)
        dataSourceUpdateFromNetwork(data: RequestType(endPoint: "issue", method: .post, parameters: newIssue))
        self.dismiss(animated: true) { [self] in
            completion?()
        }
        
    }
    
    private func createIssue(_ title: String) -> Issue {
        let content = contentTextView.text
        
        let firstComment = Comment(id: nil, isFirst: true, createdAt: nil, updatedAt: nil, content: content)
        return Issue(id: nil, title: title, firstComment: firstComment, isOpen: true, createdAt: nil, updatedAt: nil, creater: nil, milestone: nil, assignees: nil, comments: nil, labels: nil)
    }
    
    private func dataSourceUpdateFromNetwork<T: Codable> (data: RequestType<T>) {
        let api = NetworkManager()
        api.postRequest(type: RequestType(endPoint: data.endPoint, method: .post, parameters: data.parameters)) { (data: [T]) in
            print(data)
        }
    }
    
    private func configureVibrateAlert(_ title: String) -> Bool {
        if(title.isEmpty) {
            titleTextField.configurePlaceholderColor(color: UIColor.systemRed)
            AudioServicesPlaySystemSound(kSystemSoundID_Vibrate)
            return true
        }
        return false
    }

}

extension NewIssueViewController: UITextViewDelegate {
    func textViewDidBeginEditing(_ textView: UITextView) {
        contentTextView.text = ""
        contentTextView.textColor = UIColor.black
    }
}


