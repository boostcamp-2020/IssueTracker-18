//
//  Date+toString.swift
//  IssueTracker
//
//  Created by A on 2020/11/11.
//

import Foundation

extension Date {
    
    func toString() -> String {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd HH:mm:ss"
        return dateFormatter.string(from: self)
    }
}
