//
//  MilestoneCollectionViewCell.swift
//  IssueTracker
//
//  Created by 류연수 on 2020/11/05.
//

import UIKit

class MilestoneCollectionViewCell: UICollectionViewListCell {
    @IBOutlet weak var percentage: UILabel!
    @IBOutlet weak var openCount: UILabel!
    @IBOutlet weak var closedCount: UILabel!
    @IBOutlet weak var title: BadgeLabel!
    @IBOutlet weak var descriptText: UILabel!
}
