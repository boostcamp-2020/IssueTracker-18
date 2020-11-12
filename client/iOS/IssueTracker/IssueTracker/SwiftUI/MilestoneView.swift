//
//  MilestoneView.swift
//  IssueTracker
//
//  Created by 류연수 on 2020/11/12.
//

import SwiftUI

struct MilestoneView: View {
    
    var milestone: Milestone
    
    init(_ milestone: Milestone) {
        self.milestone = milestone
    }
    
    var body: some View {
        VStack {
            Text(milestone.title)
                .lineLimit(1)
            Capsule()
                .fill(Color.gray)
                
        }.padding()
        .overlay(
            RoundedRectangle(cornerRadius: 3.0)
                .stroke(Color(UIColor.systemGray3), lineWidth: 1)
        )
        .background(Color(UIColor.systemBackground))
    }
}
