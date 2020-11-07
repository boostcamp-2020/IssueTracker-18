//
//  IssueCollectionViewCell.swift
//  IssueTracker
//
//  Created by A on 2020/11/07.
//

import UIKit
class IssueCollectionViewCell: UICollectionViewListCell{
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var labelBadgeLabel: BadgeLabel!
    @IBOutlet weak var milestoneBadgeLabel: BadgeLabel!
    @IBOutlet weak var descriptionLabel: UILabel!
    
    override func updateConfiguration(using state: UICellConfigurationState) {
        layoutIfNeeded()
    }
}
