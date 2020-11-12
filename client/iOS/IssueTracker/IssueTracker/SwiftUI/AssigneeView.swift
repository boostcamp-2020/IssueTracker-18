//
//  AssigneeView.swift
//  IssueTracker
//
//  Created by 류연수 on 2020/11/12.
//

import SwiftUI

struct AssigneeView: View {
    
    //    var profile: UIImage
    var name: String
    
    init(_ name: String) {
        //        self.profile = profile
        self.name = name
    }
    
    var body: some View {
        VStack {
            //            Image(uiImage: profile)
            //                .cornerRadius(3.0)
            Image(systemName: "person.fill").resizable()
                .cornerRadius(3.0)
                .frame(width: 40.0, height: 40.0)
            Text(name)
        }
    }
    
}
