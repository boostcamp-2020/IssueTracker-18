//
//  LabelListCell.swift
//  IssueTracker
//
//  Created by A on 2020/11/04.
//

import UIKit

class LabelListCell: UICollectionViewListCell {
    private var label: Label? = nil
    static let reuseIdentifier = "reuse-labelList-cell"
    @IBOutlet weak var labelView: UIView!
    @IBOutlet weak var descriptionLabel: UILabel!
    
    func updateWithLabel(_ newLabel: Label) {
        guard label != newLabel else { return }
        label = newLabel
        setViews()
    }
    
    func setViews() {
        descriptionLabel.text = label?.description
    }
}
