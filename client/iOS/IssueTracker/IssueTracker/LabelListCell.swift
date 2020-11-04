//
//  LabelListCell.swift
//  IssueTracker
//
//  Created by A on 2020/11/04.
//

import UIKit

class LabelListCell: UICollectionViewListCell {
    private var label: Label? = nil
    private let labelView = LabelLabel()
    private let descriptionLabel = UILabel()
    
    func updateWithLabel(_ newLabel: Label) {
        guard label != newLabel else { return }
        label = newLabel
        setNeedsUpdateConfiguration()
    }
    
    override var configurationState: UICellConfigurationState {
        var state = super.configurationState
        state.label = self.label
        return state
    }
    
    private func setupViewIfNeeded() {
        contentView.addSubview(labelView)
        contentView.addSubview(descriptionLabel)

        labelView.translatesAutoresizingMaskIntoConstraints = false
        descriptionLabel.translatesAutoresizingMaskIntoConstraints = false

        
        NSLayoutConstraint.activate([
            contentView.heightAnchor.constraint(equalToConstant: 62),
            labelView.topAnchor.constraint(equalTo: contentView.topAnchor, constant: 11),
            labelView.leadingAnchor.constraint(equalTo: contentView.leadingAnchor, constant: 17),
            descriptionLabel.leadingAnchor.constraint(equalTo: labelView.leadingAnchor),
            descriptionLabel.topAnchor.constraint(equalTo: labelView.bottomAnchor, constant: 5)
        ])

    }
    
    private var separatorConstraint: NSLayoutConstraint?
    private func updateSeparatorConstraint() {
        if let existingConstraint = separatorConstraint, existingConstraint.isActive {
            return
        }
        let constraint = separatorLayoutGuide.leadingAnchor.constraint(equalTo: descriptionLabel.leadingAnchor)
        constraint.isActive = true
        separatorConstraint = constraint
    }
    
    override func updateConfiguration(using state: UICellConfigurationState) {
        setupViewIfNeeded()
        let valueConfiguration = UIListContentConfiguration.valueCell().updated(for: state)
        
        labelView.text = state.label?.title
        descriptionLabel.text = state.label?.description
        descriptionLabel.textColor = valueConfiguration.secondaryTextProperties.resolvedColor()
        descriptionLabel.font = valueConfiguration.secondaryTextProperties.font
        descriptionLabel.adjustsFontForContentSizeCategory = valueConfiguration.secondaryTextProperties.adjustsFontForContentSizeCategory
    }
}

fileprivate extension UIConfigurationStateCustomKey {
    static let label =  UIConfigurationStateCustomKey("com.alimelon.ItemListCell.item")
}

private extension UICellConfigurationState {
    var label: Label? {
        set { self[.label] = newValue }
        get { return self[.label] as? Label }
    }
}
