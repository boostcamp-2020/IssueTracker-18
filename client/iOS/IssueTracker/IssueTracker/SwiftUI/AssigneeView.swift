//
//  AssigneeView.swift
//  IssueTracker
//
//  Created by 류연수 on 2020/11/12.
//

import SwiftUI

struct AssigneeView: View {
    
    var user: User
    
    init(_ user: User) {
        self.user = user
    }
    
    var body: some View {
        VStack {
            //            Image(uiImage: profile)
            //                .cornerRadius(3.0)
            Image(systemName: "person.fill").resizable()
                .cornerRadius(3.0)
                .frame(width: 40.0, height: 40.0)
            Text(user.name ?? user.email)
                .lineLimit(1)
                .font(.system(size: 14.0))
        }
    }
    
}
