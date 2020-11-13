//
//  BottomViewController.swift
//  IssueTracker
//
//  Created by A on 2020/11/10.
//

import UIKit
import SwiftUI

class BottomViewController: UIViewController {
    
    var issue: Issue?

    override func viewDidLoad() {
        super.viewDidLoad()

    }
    
    @IBSegueAction func addSwiftUIView(_ coder: NSCoder) -> UIViewController? {
        guard let issue = issue else { return nil }
        return UIHostingController(coder: coder, rootView: SwiftUIView(issue: issue))
    }

}
