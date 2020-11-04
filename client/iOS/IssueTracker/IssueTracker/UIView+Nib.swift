//
//  UIView+Nib.swift
//  IssueTracker
//
//  Created by 류연수 on 2020/11/03.
//

import UIKit

extension UIView {
    /// Load the view from a nib file called with the name of the class
    ///
    /// - Note: The first object of the nib file **must** be of the matching class
    static func loadFromNib() -> Self {
        let bundle = Bundle(for: self)
        let nib = UINib(nibName: String(describing: self), bundle: bundle)
        return nib.instantiate(withOwner: nil, options: nil).first as! Self
    }
}
