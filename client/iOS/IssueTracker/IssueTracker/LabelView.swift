//
//  LabelView.swift
//  IssueTracker
//
//  Created by A on 2020/11/05.
//

import UIKit

class LabelLabel: UIView {
    private let xibName = "LabelView"
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        commonInit()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        commonInit()
    }
    
    private func commonInit() {
        guard let view = Bundle.main.loadNibNamed(xibName, owner: self, options: nil)?.first as? UIView else { return }
        view.frame = bounds
        addSubview(view)
    }
}
