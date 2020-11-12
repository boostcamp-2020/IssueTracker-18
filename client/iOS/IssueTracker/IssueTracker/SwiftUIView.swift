//
//  SwiftUIView.swift
//  IssueTracker
//
//  Created by A on 2020/11/10.
//

import SwiftUI

struct SwiftUIView: View {
    
    let issue: Issue = Issue(id: 1, title: "이슈 생성 기능", isOpen: true, createdAt: "", updatedAt: "", creater: User(id: nil, email: "zhdtns2005@naver.com", imageUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAW0lEQVQ4T2NkYGBg+P///38QDQLir11gTDD9UnQPCh+dg66ecdRAjPAiFKYEw5BQoKNH0jAwEN0L6EFAspdHDcSbj7HldYJ5mZCJ6JE0BA0k5EVCyQrDy8PfQAAC85QlbKFkwQAAAABJRU5ErkJggg==", name: "성주"), milestone: nil, assignees: nil, comments: [], labels: nil)
    let comments: [Comment] =  [
        Comment(id: 0, isFirst: true, creater: User(id: nil, email: "zhdtns2005@naver.com", imageUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAW0lEQVQ4T2NkYGBg+P///38QDQLir11gTDD9UnQPCh+dg66ecdRAjPAiFKYEw5BQoKNH0jAwEN0L6EFAspdHDcSbj7HldYJ5mZCJ6JE0BA0k5EVCyQrDy8PfQAAC85QlbKFkwQAAAABJRU5ErkJggg==", name: "성주"), createdAt: nil, updatedAt: "2020-11-01T11:11:11.000Z", content: "안녕하세요! 훌륭 하군요 ㅎㅎ"),Comment(id: 1, isFirst: true, creater: User(id: nil, email: "zhdtns2005@naver.com", imageUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAW0lEQVQ4T2NkYGBg+P///38QDQLir11gTDD9UnQPCh+dg66ecdRAjPAiFKYEw5BQoKNH0jAwEN0L6EFAspdHDcSbj7HldYJ5mZCJ6JE0BA0k5EVCyQrDy8PfQAAC85QlbKFkwQAAAABJRU5ErkJggg==", name: "연수"), createdAt: nil, updatedAt: "2020-11-11T11:11:11.000Z", content: "안녕하세요! 호호dfafdajkdljfk아ㅓ라더랴ㅏㅁㄷ러ㅏ어라ㅣㅁ어라ㅣ머아ㅣ럼아러ㅏ밍러ㅏㅣ멍랴ㅏㅣㅁㄴ어림어라ㅣㅁ얼;ㅁ너라ㅣ먼ㅇ라ㅣㅇ너홓")]
    
    @State var offset: CGFloat = 0
    @State var touchedCount = 0
    
    var body: some View {
        ZStack(alignment: Alignment(horizontal: .center, vertical: .center), content: {
            //            VStack {
            List {
                VStack (alignment: .leading) {
                    HStack{
                        Image(systemName: "person.fill")
                            .frame(width:25, height:25)
                            .clipped()
                        Text((issue.creater?.name)!)
                            .padding(.leading, 3)
                        Spacer()
                        Text("#\(issue.id!)")
                            .foregroundColor(Color(UIColor.systemGray))
                    }
                    Text(issue.title).font(.system(size:22, weight: .semibold))
                        .padding(.top, 3)
                    OpenCloseView(issue.isOpen)
                }
                .padding(.top, 1)
                .padding(.bottom, 1)
                
                ForEach(comments, id: \.id) { comment in
                    // comment row
                    VStack(alignment: .leading) {
                        HStack {
                            Image(systemName: "person.fill").frame(width:40, height:40)
                                .clipped()
                            VStack {
                                Text((comment.creater?.name)!)
                                Text(((comment.updatedAt?.timeAgoDisplay())!)).foregroundColor(Color(UIColor.systemGray))
                            }
                            Spacer()
                            Button(action: {
                                
                            }) {
                                Image(systemName: "ellipsis")
                                    .foregroundColor(Color(UIColor.systemGray))
                            }
                        }
                        Text(comment.content!)
                            .padding(.vertical, 7)
                    }
                    
                    
                }
                
                //                }
            }
            
            
            
            
            
            /// to read frame height...
            GeometryReader{ reader in
                VStack {
                    BottomSheet(offset: $offset, value: (-reader.frame(in: .global).height + 130))
                        .offset(y: reader.frame(in: .global).height - 130)
                        // adding gesture...
                        .offset(y: offset)
                        .gesture(DragGesture().onChanged({ (value) in
                            withAnimation {
                                // checking the direction of scroll...
                                
                                //scrolling upWards...
                                if value.startLocation.y > reader.frame(in: .global).midX {
                                    if value.translation.height < 0 && offset > (-reader.frame(in: .global).height + 130) {
                                        offset = value.translation.height
                                    }
                                }
                                if value.startLocation.y < reader.frame(in: .global).midX {
                                    if value.translation.height > 0 && offset < 0 {
                                        offset = (-reader.frame(in: .global).height + 130) + value.translation.height
                                    }
                                }
                            }
                        }).onEnded({ (value) in
                            withAnimation {
                                // checking and pulling up the screen
                                if value.startLocation.y > reader.frame(in: .global).midX {
                                    if -value.translation.height > reader.frame(in: .global).midX {
                                        offset = (-reader.frame(in: .global).height + 130)
                                        return
                                    }
                                    offset = 0
                                }
                                
                                if value.startLocation.y < reader.frame(in: .global).midX {
                                    if value.translation.height < reader.frame(in: .global).midX {
                                        offset = (-reader.frame(in: .global).height + 130)
                                        return
                                    }
                                    offset = 0
                                }
                            }
                        })
                        )
                    
                }
                .ignoresSafeArea(.all, edges: .bottom)
                
            }
        }).background(Color(UIColor.systemGray5))
        
    }
}

struct SwiftUIView_Previews: PreviewProvider {
    static var previews: some View {
        SwiftUIView()
    }
}

struct BottomSheet: View {
    
    @State var txt = ""
    @Binding var offset: CGFloat
    var value: CGFloat
    var body: some View {
        
        VStack {
            Capsule()
                .fill(Color.gray.opacity(0.5))
                .frame(width: 50, height: 5)
                .padding(.top)
                .padding(.bottom, 5)
            
            HStack(spacing: 15){
                Image(systemName: "magnifyingglass")
                    .font(.system(size: 22))
                    .foregroundColor(.gray)
                
                TextField("Search Place", text: $txt) { (status) in
                    withAnimation {
                        offset = value
                    }
                } onCommit: {
                    
                }
                
            }
            .padding(.vertical, 10)
            .padding(.horizontal)
            //blur view
            //for Dark Mode Adoption
            .background(BlurView(style: .systemMaterial))
            .cornerRadius(15)
            .padding()
            
            ScrollView(.vertical, showsIndicators: false, content: {
                LazyVStack(alignment: .leading, spacing: 15, content: {
                    ForEach(1...10, id: \.self) { count in
                        Text("Placeholder \(count)")
                        
                        Divider()
                            .padding(.top, 10)
                    }
                })
                .padding()
                .padding(.top)
            })
        }
        .background(BlurView(style: .systemMaterial))
        .cornerRadius(15)
    }
}

struct BlurView: UIViewRepresentable {
    
    var style: UIBlurEffect.Style
    
    func makeUIView(context: Context) -> UIVisualEffectView {
        let view = UIVisualEffectView(effect: UIBlurEffect(style: style))
        return view
    }
    
    func updateUIView(_ uiView: UIVisualEffectView, context: Context) {
        
    }
}


