//
//  BottomSheetViewController.swift
//  IssueTracker
//
//  Created by 류연수 on 2020/11/11.
//

import UIKit
import SwiftUI

class BottomSheetViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

    @IBSegueAction func addBottomSheetView(_ coder: NSCoder) -> UIViewController? {
        return UIHostingController(coder: coder, rootView: BottomSheetView())
    }
}
