//
//  Date+EasyConverter.swift
//  IssueTracker
//
//  Created by 류연수 on 2020/11/07.
//

import Foundation

extension Date {
    
    func convertToString(dateFormat: String = "yyyy-MM-dd HH:mm:ss") -> String {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = dateFormat

        return dateFormatter.string(from: self)
    }
    
    func convertToDate(dateString: String,
                       dateFormat: String = "yyyy-MM-dd HH:mm:ss",
                       timeZone: String = "UTC") -> Date? {
        let dateFormatter = DateFormatter()

        dateFormatter.dateFormat = dateFormat
        dateFormatter.timeZone = NSTimeZone(name: timeZone) as TimeZone?

        return dateFormatter.date(from: dateString)
    }
}
