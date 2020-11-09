//
//  Date+TimeAgoDisplay.swift
//  IssueTracker
//
//  Created by 류연수 on 2020/11/10.
//

import UIKit

extension Date {
    
    func timeAgoDisplay() -> String {
        let formatter = RelativeDateTimeFormatter()
        formatter.unitsStyle = .full
        return formatter.localizedString(for: self, relativeTo: Date())
    }
    
}
