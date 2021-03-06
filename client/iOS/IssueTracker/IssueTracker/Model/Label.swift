//
//  Label.swift
//  IssueTracker
//
//  Created by A on 2020/11/02.
//

import Foundation

struct Label: Codable, Hashable, Badgeable, Identifiable {
    let id: Int?
    let title: String
    let description: String?
    let color: String
}
