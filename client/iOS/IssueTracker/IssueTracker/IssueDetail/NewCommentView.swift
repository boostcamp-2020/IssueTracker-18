//
//  NewCommentView.swift
//  IssueTracker
//
//  Created by 류연수 on 2020/11/11.
//

import SwiftUI

struct NewCommentView: View {
    
    var issueId: Int
    @State private var message = "코멘트를 입력해주세요."
    @State private var textStyle = UIFont.TextStyle.body
    @Environment(\.presentationMode) var presentationMode
    
    var body: some View {
        NavigationView {
            VStack {
                TextView(text: $message, textStyle: $textStyle)
                    .padding(.horizontal)
                .navigationTitle("New Comment")
                Button(action: {
                    let parameter = Comment(id: nil, isFirst: false, creater: nil, createdAt: nil, updatedAt: nil, content: message, issueId: issueId)
                    let requestType = RequestType(endPoint: "comment",
                                                       method: .post,
                                                       parameters: parameter,
                                                       id: nil)
                    let api = NetworkManager()
                    api.request(type: requestType) { (data: UpadateResponse) in
                        print(data)
                    }
                    self.presentationMode.wrappedValue.dismiss()
                }) {
                    HStack {
                        Spacer()
                        Text("Save Comment")
                            .font(.headline)
                            .foregroundColor(Color(UIColor.systemBlue))
                        Spacer()
                    }
                }.buttonStyle(RoundedRectangleButtonStyle())
                .padding()
            }
        }
    }
}

struct NewCommentView_Previews: PreviewProvider {
    static var previews: some View {
        NewCommentView(issueId: 1)
    }
}
