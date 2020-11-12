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
    
    let user1 = User(id: 1, email: "yeonduing@gmail.com", imageUrl: nil, name: "yeonduing")
    let user2 = User(id: 2, email: "yeonduing@gmail.com", imageUrl: nil, name: "yeonduing")
    let user3 = User(id: 3, email: "yeonduing@gmail.com", imageUrl: nil, name: "yeonduing")
    let user4 = User(id: 4, email: "yeonduing@gmail.com", imageUrl: nil, name: "yeonduing")
    let user5 = User(id: 5, email: "yeonduing@gmail.com", imageUrl: nil, name: "yeonduing")
    let user6 = User(id: 6, email: "yeonduing@gmail.com", imageUrl: nil, name: "yeonduing")
    let milestone = Milestone(id: nil, title: "Week3", description: nil, isOpen: true, dueDate: nil)
    let label1 = Label(id: 1, title: "iOS", description: nil, color: "#F01932")
    let label2 = Label(id: 2, title: "iOS", description: nil, color: "#F01932")
    let label3 = Label(id: 3, title: "iOS", description: nil, color: "#F01932")
    let label4 = Label(id: 4, title: "iOㄴㅁㅇ라ㅓ망러S", description: nil, color: "#F01932")
    let label5 = Label(id: 5, title: "iOS", description: nil, color: "#F01932")
    let label6 = Label(id: 6, title: "iOS", description: nil, color: "#F01932")
    let label7 = Label(id: 7, title: "아러망럼ㅇ러망럼ㅇ라ㅓ", description: nil, color: "#F01932")
    let label8 = Label(id: 8, title: "iO아럼ㅇ럼아러댜ㅓㄹㅁS", description: nil, color: "#F01932")
    let label9 = Label(id: 9, title: "iO아럼ㅇ라ㅓㅁ아럼ㅇS", description: nil, color: "#F01932")
    
    var gridItemLayout = [GridItem(.adaptive(minimum: 70))]
    var gridItemLayoutOfLable = [GridItem(.adaptive(minimum: 70))]
    
    var body: some View {
        let issue = Issue(id: nil, title: "bottomSheet 구성", firstComment: Comment(id: nil, isFirst: true, creater: user1, createdAt: nil, updatedAt: nil, content: "swiftUI 사용"), isOpen: true, createdAt: nil, updatedAt: nil, creater: user1, milestone: milestone, assignees: [user1, user2, user3, user4, user5, user6], comments: nil, labels: [label1, label2, label3, label4, label5, label6, label7, label8, label9])
        
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
                    MilestoneView(Milestone(id: nil, title: "Week3", description: nil, isOpen: true, dueDate: nil))
                    Divider()
                        .padding(.top, 10)
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
