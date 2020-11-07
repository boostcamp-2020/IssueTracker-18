//
//  Comment.swift
//  IssueTracker
//
//  Created by A on 2020/11/03.
//

import Foundation

struct Comment: Codable, Hashable {
    let id: Int?
    let isFirst: Bool
//    let creater: User
//    let createAt: String
//    let updateAt: String
    let content: String
//    let emojis: [Emoji]?
}
