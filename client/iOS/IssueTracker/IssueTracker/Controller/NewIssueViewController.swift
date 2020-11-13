//
//  NewIssueViewController.swift
//  IssueTracker
//
//  Created by A on 2020/11/10.
//

import UIKit
import AudioToolbox
import Down

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
    var downView: DownView? = nil
    
    // MARK: - Life Cycle Methods
    override func viewDidLoad() {
        super.viewDidLoad()
        contentTextView.delegate = self
        addTargets()
        configureDownView()
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
    
    private func addTargets() {
        addNewIssueButton.addTarget(self, action: #selector(postNewIssue), for: .touchUpInside)
        segmentedControl.addTarget(self, action: #selector(segmentedControlValueChanged(sender:)), for: .valueChanged)
    }
    
    private func createIssue(_ title: String) -> Issue {
        let content = contentTextView.text
        
        let firstComment = Comment(id: nil, isFirst: true, creater: nil, createdAt: nil, updatedAt: nil, content: content, issueId: nil)
        return Issue(id: nil, title: title, firstComment: firstComment, isOpen: true, createdAt: nil, updatedAt: nil, creater: nil, milestone: nil, assignees: nil, comments: nil, labels: [])
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
    
    private func configureDownView() {
        downView = try? DownView(frame: contentTextView.bounds, markdownString: contentTextView.text)
        if let downView = downView {
            downView.isHidden = true
            view.addSubview(downView)
            downView.translatesAutoresizingMaskIntoConstraints = false
            NSLayoutConstraint.activate([
                downView.leadingAnchor.constraint(equalTo: contentTextView.leadingAnchor),
                downView.topAnchor.constraint(equalTo: contentTextView.topAnchor),
                downView.trailingAnchor.constraint(equalTo: contentTextView.trailingAnchor),
                downView.bottomAnchor.constraint(equalTo: contentTextView.bottomAnchor)
            ])
        }
    }
    
    @objc private func segmentedControlValueChanged(sender: UISegmentedControl) {
        let seletedSegmentedIndex = sender.selectedSegmentIndex
        if seletedSegmentedIndex == 1 {
            downView?.isHidden = false
            try? downView?.update(markdownString: contentTextView.text)
        } else {
            downView?.isHidden = true
        }
        
    }
    
}

extension NewIssueViewController: UITextViewDelegate {
    func textViewDidBeginEditing(_ textView: UITextView) {
        contentTextView.text = ""
        contentTextView.textColor = UIColor.black
    }
}


