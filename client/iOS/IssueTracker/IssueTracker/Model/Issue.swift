//
//  Issue.swift
//  IssueTracker
//
//  Created by A on 2020/11/02.
//

import Foundation

struct Issue: Codable, Hashable { 
    let id: Int?
    var title: String
//    let firstComment: Comment
    var isOpen: Bool
    var createdAt: String
    var updatedAt: String
    var creater: User?
    var milestone: Milestone?
    var assignees: [User]?
    var comments: [Comment]
    var labels: [Label]?
    
    static func == (lhs: Issue, rhs: Issue) -> Bool {
        return lhs.id == rhs.id
    }
}
