//
//  NetworkManager.swift
//  IssueTracker
//
//  Created by A on 2020/11/05.
//

import Foundation
import Alamofire

public class NetworkManager {
    static let baseUrl = "http://49.50.173.66/api/"
    
    static func getData(from endPoint: String, completion: @escaping (Data)->()) {
        let url = baseUrl + endPoint
        let alamo = AF.request(url, method: .get).validate(statusCode: 200..<300)
        alamo.responseJSON { (response) in
            switch response.result {
            case .success(let value):
                do {
                    let data = try JSONSerialization.data(withJSONObject: value)
                    DispatchQueue.main.async {
                        completion(data)
                    }
                } catch {
                    
                }
            case .failure(let error):
                print(error)
            }
        }
    }
    
    static func postData(from endPoint: String, data: Label, completion: @escaping (Data)->()) {
        let url = baseUrl + endPoint
        let alamo = AF.request(url,
                               method: .post,
                               parameters: data,
                               encoder: JSONParameterEncoder.default).validate(statusCode: 200..<300)
        alamo.responseJSON { (response) in
            switch response.result {
            case .success(let value):
                do {
                    let data = try JSONSerialization.data(withJSONObject: value)
                    DispatchQueue.main.async {
                        completion(data)
                    }
                } catch {
                    
                }
            case .failure(let error):
                print(error)
            }
        }
    }
    
}
