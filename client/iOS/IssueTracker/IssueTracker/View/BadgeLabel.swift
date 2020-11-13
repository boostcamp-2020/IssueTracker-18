//
//  BadgeLabel.swift
//  IssueTracker
//
//  Created by 류연수 on 2020/11/05.
//

import UIKit

@IBDesignable class BadgeLabel: UILabel {
    
    @IBInspectable var topInset: CGFloat = 2.0
    @IBInspectable var bottomInset: CGFloat = 2.0
    @IBInspectable var leftInset: CGFloat = 7.0
    @IBInspectable var rightInset: CGFloat = 7.0
    
    override init(frame: CGRect) {
        super.init(frame: frame)
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        configure()
    }
    
    init() {
        super.init(frame: .zero)
        configure()
    }
    
    private func configure() {
        textAlignment = .center
        font = UIFont.systemFont(ofSize: 14, weight: .medium)
        sizeToFit()
        translatesAutoresizingMaskIntoConstraints = false
        layer.cornerRadius = 10
        clipsToBounds = true
        widthAnchor.constraint(greaterThanOrEqualToConstant: 30).isActive = true
    }
    
    override func drawText(in rect: CGRect) {
        let insets = UIEdgeInsets(top: topInset, left: leftInset, bottom: bottomInset, right: rightInset)
        super.drawText(in: rect.inset(by: insets))
    }
    
    override var intrinsicContentSize: CGSize {
        let size = super.intrinsicContentSize
        return CGSize(width: size.width + leftInset + rightInset,
                      height: size.height + topInset + bottomInset)
    }
    
    override var bounds: CGRect {
        didSet {
            // ensures this works within stack views if multi-line
            preferredMaxLayoutWidth = bounds.width - (leftInset + rightInset)
        }
    }
    
    private func isColorLight(color: UIColor) -> Bool {
        let rgba = color.rgba
        let brightness = (0.299 * rgba.red + 0.587 * rgba.green + 0.114 * rgba.blue)
        return brightness > 0.5
    }
    
    func configureView(kind: BadgeType, backgroundColor: String = "#FFFFFF") {
        self.backgroundColor = UIColor(hex: backgroundColor)
        switch kind {
        case .label:
            self.backgroundColor = UIColor(hex: backgroundColor)
            if(isColorLight(color: UIColor(hex: backgroundColor))) {
                textColor = UIColor.black
            } else {
                textColor = UIColor.white
            }
            return
        case .milestone:
            self.backgroundColor = UIColor.systemBackground
            layer.borderWidth = 1
            layer.borderColor = #colorLiteral(red: 0.2549019754, green: 0.2745098174, blue: 0.3019607961, alpha: 1)
        }
    }
}
