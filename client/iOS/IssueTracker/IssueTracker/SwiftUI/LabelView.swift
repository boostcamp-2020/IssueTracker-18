//
//  LabelView.swift
//  IssueTracker
//
//  Created by 류연수 on 2020/11/12.
//

import SwiftUI

struct LabelView: View {
    
    var label: Label
    
    init(_ label: Label) {
        self.label = label
    }
    
    var body: some View {
        Text(label.title)
            .padding(.horizontal)
            .padding(.vertical, 5)
            .background(Color(UIColor(hex: label.color)))
            .cornerRadius(100)
    }
}
