//
//  UITextField+PlaceholderColor.swift
//  IssueTracker
//
//  Created by 류연수 on 2020/11/07.
//

import UIKit

extension UITextField {
    
    func configurePlaceholderColor(color: UIColor) {
        guard let placeholderText = self.placeholder else { return }
        self.attributedPlaceholder = NSAttributedString(string: placeholderText, attributes: [NSAttributedString.Key.foregroundColor : color])
    }
    
}
