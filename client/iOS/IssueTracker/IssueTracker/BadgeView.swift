//
//  BadgeView.swift
//  IssueTracker
//
//  Created by 류연수 on 2020/11/04.
//

import UIKit

@IBDesignable class BadgeViewWrapper : NibWrapperView<BadgeView> { }

class BadgeView: UIView {
    
    @IBOutlet weak var label: UILabel!
    
    func configureLabel(with name: String) {
        label.text = name
        label.sizeToFit()
    }
    
    func configureView(kind: Kind, backgroundColor: String = "#FFFFFF") {
        self.backgroundColor = UIColor(hex: backgroundColor)
        switch kind {
        case .label:
            return
        case .milestone:
            self.layer.borderWidth = 1
            self.layer.borderColor = #colorLiteral(red: 0.2549019754, green: 0.2745098174, blue: 0.3019607961, alpha: 1)
        }
    }
    
    enum Kind {
        case label
        case milestone
    }
}
