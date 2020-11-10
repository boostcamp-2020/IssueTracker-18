//
//  Milestone.swift
//  IssueTracker
//
//  Created by A on 2020/11/02.
//

import Foundation

struct Milestone: Codable, Hashable, Badgeable {
    let id: Int?
    var title: String
    var description: String?
    var isOpen: Bool
    var dueDate: String?
}
