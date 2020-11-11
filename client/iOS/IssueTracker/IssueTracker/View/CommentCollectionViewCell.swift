//
//  CommentCollectionViewCell.swift
//  IssueTracker
//
//  Created by 류연수 on 2020/11/10.
//

import UIKit

class CommentCollectionViewCell: UICollectionViewListCell {
    
    @IBOutlet weak var profileImage: UIImageView!
    @IBOutlet weak var userName: UILabel!
    @IBOutlet weak var contents: UILabel!
    @IBOutlet weak var updatedAt: UILabel!
    
    override func updateConfiguration(using state: UICellConfigurationState) {
        layoutIfNeeded()
    }
}
