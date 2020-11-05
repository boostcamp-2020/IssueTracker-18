//
//  Milestone.swift
//  IssueTracker
//
//  Created by A on 2020/11/02.
//

import Foundation

struct Milestone: Codable, Hashable {
    let id: Int
    let title: String
    let description: String?
    let isOpen: Bool?
    let dueDate: String?
    let createdAt: String
    let updatedAt: String
}
