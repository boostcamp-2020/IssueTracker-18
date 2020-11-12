//
//  Emoji.swift
//  IssueTracker
//
//  Created by A on 2020/11/03.
//

import Foundation

struct Emoji: Codable, Hashable, Identifiable {
    let id: Int?
    let name: String
    let imageUrl: String
}
