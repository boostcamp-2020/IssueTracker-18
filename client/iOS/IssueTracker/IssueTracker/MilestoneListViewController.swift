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
        guard let popUpVC = self.storyboard?.instantiateViewController(withIdentifier: "MilestonePopUpViewController") as? MilestonePopUpViewController else { return }
        presentAnotherViewController(targetVC: popUpVC)
    }
    
    // MARK: - Life Cycle Methods
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    
    // MARK: - Methods
    private func configureNavigationBar() {
        self.navigationController?.navigationBar.shadowImage = UIImage()
        self.navigationController?.navigationBar.barTintColor = .systemBackground
        self.navigationController?.navigationBar.isTranslucent = false
    }

}
