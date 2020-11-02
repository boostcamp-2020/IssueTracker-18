//
//  Issue.swift
//  IssueTracker
//
//  Created by A on 2020/11/02.
//

import Foundation

struct Issue: Codable {
    let title: String
    let description: String
    let isOpen: Bool
    let createdAt: String
    let updatedAt: String
    let issuer: User
    let assignees: [User]
    let labels: [Label]
    let milestone: Milestone
}
