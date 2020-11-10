//
//  NewIssueViewController.swift
//  IssueTracker
//
//  Created by A on 2020/11/10.
//

import UIKit

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
    
    var completion: ()?
    
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
        let newIssue = createIssue()
        dataSourceUpdateFromNetwork(data: RequestType(endPoint: "issue", method: .post, parameters: newIssue))
        self.dismiss(animated: true) {
            self.completion
        }
        
    }
    
    private func createIssue() -> Issue {
        let title = titleTextField.text ?? ""
        let content = contentTextView.text ?? ""
        
        let firstComment = Comment(id: nil, isFirst: true, createdAt: Date().toString(), updatedAt: Date().toString(), content: content)
        print(firstComment)
        return Issue(id: nil, title: title, isOpen: true, createdAt: Date().toString(), updatedAt: Date().toString(), creater: nil, milestone: nil, assignees: nil, comments: [firstComment], labels: nil)
    }
    
    private func dataSourceUpdateFromNetwork<T: Codable> (data: RequestType<T>) {
        let api = NetworkManager()
        api.request(type: RequestType(endPoint: data.endPoint, method: .post, parameters: data.parameters)) { (data: [T]) in
            print(data)
        }
    }

}

extension NewIssueViewController: UITextViewDelegate {
    func textViewDidBeginEditing(_ textView: UITextView) {
        contentTextView.text = ""
        contentTextView.textColor = UIColor.black
    }
}


