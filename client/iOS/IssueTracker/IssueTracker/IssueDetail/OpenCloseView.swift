//
//  OpenCloseView.swift
//  IssueTracker
//
//  Created by A on 2020/11/12.
//

import SwiftUI

struct OpenCloseView: View {
    
    var isOpen: Bool
    
    init(_ isOpen: Bool) {
        self.isOpen = isOpen
    }
    
    var body: some View {
        if isOpen {
            HStack{
                Image(systemName: "info.circle")
                Text("Open")
                    .font(.system(size:13, weight: .semibold))
                    
            }.padding(.horizontal, 7)
            .padding(.vertical, 3)
            .foregroundColor(Color(UIColor.systemGreen).opacity(1))
            .background(Color(UIColor.systemGreen).opacity(0.2))
            .cornerRadius(60)
            .lineLimit(1)
            
        } else {
            HStack{
                Image(systemName: "info.circle")
                Text("Close")
                    .font(.system(size:13, weight: .semibold))
                    
            }.padding(.horizontal, 7)
            .padding(.vertical, 3)
            .foregroundColor(Color(UIColor.systemRed).opacity(1))
            .background(Color(UIColor.systemRed).opacity(0.2))
            .cornerRadius(60)
            .lineLimit(1)
        }
    }
}

struct OpenCloseView_Previews: PreviewProvider {
    static var previews: some View {
        OpenCloseView(true)
    }
}

