//
//  OpenCloseView.swift
//  IssueTracker
//
//  Created by A on 2020/11/12.
//

import SwiftUI

struct OpenCloseView: View {
    
    @State var isOpen: Bool = true
    
    init(_ isOpen: Bool) {
        self.isOpen = isOpen
    }
    
    var body: some View {
        if isOpen {
            Text("Open")
                .font(.headline)
                .padding(.horizontal)
                .padding(.vertical, 5)
                .foregroundColor(Color(UIColor.systemGreen).opacity(1))
                .background(Color(UIColor.systemGreen).opacity(0.3))
                .cornerRadius(100)
                .lineLimit(1)
        } else {
            Text("Close")
                .font(.headline)
                .padding(.horizontal)
                .padding(.vertical, 5)
                .foregroundColor(Color(UIColor.systemRed).opacity(1))
                .background(Color(UIColor.systemRed).opacity(0.3))
                .cornerRadius(100)
                .lineLimit(1)
        }
    }
}

struct OpenCloseView_Previews: PreviewProvider {
    static var previews: some View {
        OpenCloseView(true)
    }
}

