//
//  BottomViewController.swift
//  IssueTracker
//
//  Created by A on 2020/11/10.
//

import UIKit
import SwiftUI

class BottomViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

    }
    
    @IBSegueAction func addSwiftUIView(_ coder: NSCoder) -> UIViewController? {
        return UIHostingController(coder: coder, rootView: SwiftUIView())
    }

}
