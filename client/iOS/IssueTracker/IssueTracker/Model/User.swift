//
//  User.swift
//  IssueTracker
//
//  Created by A on 2020/11/02.
//

import Foundation

struct User: Codable, Hashable {
    let name: String
    let email: String
    let image_url: String
}
