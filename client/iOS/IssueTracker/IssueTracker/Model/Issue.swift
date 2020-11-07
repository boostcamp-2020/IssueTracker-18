//
//  Issue.swift
//  IssueTracker
//
//  Created by A on 2020/11/02.
//

import Foundation

struct Issue: Codable, Hashable { 
    let id: Int?
    let title: String
//    let firstComment: Comment
    let isOpen: Bool
    let createdAt: String
    let updatedAt: String
    let creater: User
    let comments: [Comment]?
    let assignees: [User]?
    let labels: [Label]?
    let milestone: Milestone?
    
    static func == (lhs: Issue, rhs: Issue) -> Bool {
        return lhs.id == rhs.id
    }
}
