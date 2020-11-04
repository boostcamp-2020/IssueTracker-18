//
//  MilestoneListViewController.swift
//  IssueTracker
//
//  Created by 류연수 on 2020/11/03.
//

import UIKit

class MilestoneListViewController: UIViewController {
    
    // MARK: - @IBOutlet Properties
    @IBOutlet weak var navigationBar: UINavigationBar!
    
    @IBAction func showPopUp(_ sender: UIBarButtonItem) {
        guard let popUpVC = self.storyboard?.instantiateViewController(withIdentifier: "PopUpViewController") as? PopUpViewController else { return }
        presentAnotherViewController(targetVC: popUpVC)
    }
    
    // MARK: - Life Cycle Methods
    override func viewDidLoad() {
        super.viewDidLoad()
        configureNavigationBar()
        // Do any additional setup after loading the view.
    }
    
    // MARK: - Methods
    private func configureNavigationBar() {
        navigationBar.shadowImage = UIImage()
        navigationBar.barTintColor = .systemBackground
        navigationBar.isTranslucent = false
    }

}
