//
//  User.swift
//  IssueTracker
//
//  Created by A on 2020/11/02.
//

import Foundation

struct User: Codable, Hashable {
    let id: Int?
    let email: String
    let imageUrl: String?
    let name: String?
//    let createdAt: String?
//    let updatedAt: String?
}
