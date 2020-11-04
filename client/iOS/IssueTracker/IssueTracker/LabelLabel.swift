//
//  LabelView.swift
//  IssueTracker
//
//  Created by A on 2020/11/05.
//

import UIKit

class LabelLabel: UILabel {
    override init(frame: CGRect) {
        super.init(frame: frame)
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    init() {
        super.init(frame: .zero)
        textAlignment = .center
        font = UIFont.systemFont(ofSize: 14, weight: .medium)
        
        self.text = text
        self.backgroundColor = getRandomColor()
        self.translatesAutoresizingMaskIntoConstraints = false
        self.layer.cornerRadius = 8
        self.clipsToBounds = true
        self.widthAnchor.constraint(greaterThanOrEqualToConstant: 30).isActive = true
    }
    
    private func getRandomColor() -> UIColor {
        let randomRed:CGFloat = CGFloat(drand48())
        let randomGreen:CGFloat = CGFloat(drand48())
        let randomBlue:CGFloat = CGFloat(drand48())
        return UIColor(red: randomRed, green: randomGreen, blue: randomBlue, alpha: 0.8)
    }
}
