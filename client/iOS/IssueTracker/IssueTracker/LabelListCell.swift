//
//  LabelListCell.swift
//  IssueTracker
//
//  Created by A on 2020/11/04.
//

import UIKit

class LabelListCell: UICollectionViewListCell {
    private var label: Label? = nil
    
    private let labelView = UIView()
    private let descriptionLabel = UILabel()
    private var customViewConstraints: (categoryLabelLeading: NSLayoutConstraint,
                                        categoryLabelTrailing: NSLayoutConstraint,
                                        categoryIconTrailing: NSLayoutConstraint)?
    
    
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
    
    private func defaultListContentConfiguration() -> UIListContentConfiguration { return .subtitleCell() }
    private lazy var listContentView = UIListContentView(configuration: defaultListContentConfiguration())
    
    private func setupViewIfNeeded() {
        contentView.addSubview(listContentView)
        contentView.addSubview(labelView)
        contentView.addSubview(descriptionLabel)
        listContentView.translatesAutoresizingMaskIntoConstraints = false
        let defaultHorizontalCompressionResistance = listContentView.contentCompressionResistancePriority(for: .horizontal)
        listContentView.setContentCompressionResistancePriority(defaultHorizontalCompressionResistance - 1, for: .horizontal)
        labelView.translatesAutoresizingMaskIntoConstraints = false
        descriptionLabel.translatesAutoresizingMaskIntoConstraints = false
//        let constraints = (
//            categoryLabelLeading: categoryLabel.leadingAnchor.constraint(greaterThanOrEqualTo: listContentView.trailingAnchor),
//            categoryLabelTrailing: categoryIconView.leadingAnchor.constraint(equalTo: categoryLabel.trailingAnchor),
//            categoryIconTrailing: contentView.trailingAnchor.constraint(equalTo: categoryIconView.trailingAnchor)
//        )
        
        NSLayoutConstraint.activate([
            listContentView.topAnchor.constraint(equalTo: contentView.topAnchor),
            listContentView.bottomAnchor.constraint(equalTo: contentView.bottomAnchor),
            listContentView.leadingAnchor.constraint(equalTo: contentView.leadingAnchor)
//            categoryLabel.centerYAnchor.constraint(equalTo: contentView.centerYAnchor),
//            categoryIconView.centerYAnchor.constraint(equalTo: contentView.centerYAnchor),
//            constraints.categoryLabelLeading,
//            constraints.categoryLabelTrailing,
//            constraints.categoryIconTrailing
        ])
//        customViewConstraints = constraints
    }
    
    private var separatorConstraint: NSLayoutConstraint?
    private func updateSeparatorConstraint() {
        guard let textLayoutGuide = listContentView.textLayoutGuide else { return }
        if let existingConstraint = separatorConstraint, existingConstraint.isActive {
            return
        }
        let constraint = separatorLayoutGuide.leadingAnchor.constraint(equalTo: textLayoutGuide.leadingAnchor)
        constraint.isActive = true
        separatorConstraint = constraint
    }
    
    override func updateConfiguration(using state: UICellConfigurationState) {
        setupViewIfNeeded()
        var content = defaultListContentConfiguration().updated(for: state)
        content.imageProperties.preferredSymbolConfiguration = .init(font: content.textProperties.font, scale: .large)
        content.text = state.label?.title
        content.secondaryText = state.label?.description
        content.axesPreservingSuperviewLayoutMargins = []
        listContentView.configuration = content
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
