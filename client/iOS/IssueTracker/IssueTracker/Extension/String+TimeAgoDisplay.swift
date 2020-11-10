//
//  String+TimeAgoDisplay.swift
//  IssueTracker
//
//  Created by 류연수 on 2020/11/10.
//

import UIKit

extension String {
    
    func timeAgoDisplay(dateFormat: String = "yyyy-MM-dd'T'HH:mm:ss.SSSZ") -> String? {
        let dateFormatter = DateFormatter()
        dateFormatter.locale = Locale(identifier: "ko")
        dateFormatter.dateFormat = dateFormat
        guard let date = dateFormatter.date(from: self) else { return nil }
        
        let formatter = RelativeDateTimeFormatter()
        formatter.unitsStyle = .full
        return formatter.localizedString(for: date, relativeTo: Date())
    }
    
}
