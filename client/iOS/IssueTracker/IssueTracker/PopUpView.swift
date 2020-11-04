//
//  PopUpView.swift
//  IssueTracker
//
//  Created by 류연수 on 2020/11/03.
//

import UIKit

@IBDesignable class PopUpViewWrapper : NibWrapperView<PopUpView> { }

class PopUpView: UIView {
    
    // MARK:- @IBOutlet UIButton Properties
    @IBOutlet weak var cancelButton: UIButton!
    @IBOutlet weak var saveButton: UIButton!
    @IBOutlet weak var resetButton: UIButton!
    
    // MARK:- @IBOutlet UITextField Properties
    @IBOutlet weak var titleTextField: UITextField!
    @IBOutlet weak var secondTextField: UITextField!
    @IBOutlet weak var lastTextField: UITextField!
    
}
