//
//  NibWrapperView.swift
//  IssueTracker
//
//  Created by 류연수 on 2020/11/03.
//

import UIKit

/// Class used to wrap a view automatically loaded form a nib file
class NibWrapperView<T: UIView>: UIView {
    /// The view loaded from the nib
    var contentView: T

    required init?(coder: NSCoder) {
        contentView = T.loadFromNib()
        super.init(coder: coder)
        prepareContentView()
    }
    
    override init(frame: CGRect) {
        contentView = T.loadFromNib()
        super.init(frame: frame)
        prepareContentView()
    }
    
    private func prepareContentView() {
        contentView.translatesAutoresizingMaskIntoConstraints = false
        addSubview(contentView)

        contentView.leadingAnchor.constraint(equalTo: leadingAnchor).isActive = true
        contentView.topAnchor.constraint(equalTo: topAnchor).isActive = true
        contentView.trailingAnchor.constraint(equalTo: trailingAnchor).isActive = true
        contentView.bottomAnchor.constraint(equalTo: bottomAnchor).isActive = true
    }
    
    override func prepareForInterfaceBuilder() {
        super.prepareForInterfaceBuilder()
        contentView.prepareForInterfaceBuilder()
    }
}
