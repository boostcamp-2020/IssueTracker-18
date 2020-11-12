//
//  BottomSheetView.swift
//  IssueTracker
//
//  Created by 류연수 on 2020/11/11.
//

import SwiftUI

struct BottomSheetView: View {
    
    @State var showingNewComment = false
    @Binding var offset: CGFloat
    var value: CGFloat
    var issue: Issue
    
    var gridItemLayout = [GridItem(.adaptive(minimum: 70))]
    var gridItemLayoutOfLable = [GridItem(.adaptive(minimum: 70))]
    
    var body: some View {
        
        VStack {
            Capsule()
                .fill(Color.gray.opacity(0.5))
                .frame(width: 50, height: 5)
                .padding(.top)
                .padding(.bottom, 5)
            
            HStack(spacing: 15){
                Button(action: {
                    self.showingNewComment.toggle()
                }) {
                    HStack {
                        Spacer()
                        Text("댓글 추가")
                        Spacer()
                    }
                }.sheet(isPresented: $showingNewComment) {
                    NewCommentView()
                }.buttonStyle(RoundedRectangleButtonStyle())
                
                HStack(spacing: 0) {
                    Button(action: {
                        self.showingNewComment.toggle()
                    }) {
                        Image(systemName: "chevron.up")
                    }.sheet(isPresented: $showingNewComment) {
                        NewCommentView()
                    }.padding(.trailing, 10)
                    
                    Button(action: {
                        self.showingNewComment.toggle()
                    }) {
                        Image(systemName: "chevron.down")
                    }.sheet(isPresented: $showingNewComment) {
                        NewCommentView()
                    }.padding(.leading, 10)
                    
                }.padding()
                .overlay(
                    RoundedRectangle(cornerRadius: 3.0)
                        .stroke(Color(UIColor.systemGray3), lineWidth: 1)
                )
                .background(Color(UIColor.systemBackground))
                
            }
            .padding(.horizontal)
            
            ScrollView(.vertical, showsIndicators: false, content: {
                LazyVStack(alignment: .leading, spacing: 15, content: {
                    Text("담당자")
                        .font(.title2)
                        .fontWeight(.bold)
                    LazyVGrid(columns: gridItemLayout, spacing: 20) {
                        if let assignees = issue.assignees {
                            ForEach(assignees) { assignee in
                                AssigneeView(assignee)
                            }
                        }
                    }
                    Divider()
                        .padding(.top, 10)
                    
                    Text("레이블")
                        .font(.title2)
                        .fontWeight(.bold)
                    if let labels = issue.labels {
                        TagCloudView(tags: labels)
                    }
                    Divider()
                        .padding(.top, 10)
                    
                    Text("마일스톤")
                        .font(.title2)
                        .fontWeight(.bold)
                    if let milestone = issue.milestone {
                        MilestoneView(milestone)
                    }
                    Divider()
                        .padding(.top, 10)
                    
                    Button(action: {
                        var closeParameters = issue
                        closeParameters.isOpen = !issue.isOpen
                        let requestType = RequestType(endPoint: "issue",
                                                           method: .patch,
                                                           parameters: closeParameters,
                                                           id: issue.id)
                        let api = NetworkManager()
                        api.request(type: requestType) { (data: UpadateResponse) in
                            print(data)
                        }
                    }) {
                        HStack {
                            Spacer()
                            Text("Close Issue")
                                .font(.headline)
                                .foregroundColor(Color(UIColor.systemRed))
                            Spacer()
                        }
                    }.buttonStyle(RoundedRectangleButtonStyle())
                })
                .padding()
                .padding(.top)
            })
        }
        .background(BlurView(style: .systemMaterial))
        .cornerRadius(15)
    }
}

//struct BottomSheetView_Previews: PreviewProvider {
//    static var previews: some View {
//        BottomSheetView()
//    }
//}

struct RoundedRectangleButtonStyle: ButtonStyle {
    
    func makeBody(configuration: Self.Configuration) -> some View {
        configuration.label
            .padding(.vertical, 10)
            .overlay(
                RoundedRectangle(cornerRadius: 3.0)
                    .stroke(Color(UIColor.systemGray3), lineWidth: 1)
            )
            .foregroundColor(configuration.isPressed ? Color.blue.opacity(0.3) : Color.blue
            )
            .background(Color(UIColor.systemBackground))
    }
    
}
