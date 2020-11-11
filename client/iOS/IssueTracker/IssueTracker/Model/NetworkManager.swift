//
//  NetworkManager.swift
//  IssueTracker
//
//  Created by A on 2020/11/05.
//

import Foundation
import Alamofire

struct RequestType<T: Codable> {
    var url: String {
        guard let id = self.id else {
            return baseUrl + endPoint + "/"
        }
        return "\(baseUrl)\(endPoint)/\(id)"
    }
    var baseUrl: String = "http://49.50.173.66/api/"
    let endPoint: String
    let method: HTTPMethod
    let parameters: T?
    var id: Int? = nil
}

struct UpadateResponse: Codable {
    let numOfaffectedRows: Int
}

public class NetworkManager {
    
    func request<T: Codable, U: Codable> (type: RequestType<T>,
                        completion: @escaping (U) -> Void) {
        let alamo = AF.request(type.url,
                               method: type.method,
                               parameters: type.parameters).validate(statusCode: 200..<300)
        processRequest(alamo: alamo, completion: completion)
        
    }
    
    func postRequest<T: Codable, U: Codable> (type: RequestType<T>,
                        completion: @escaping (U) -> Void) {
        guard let encodedData = try? JSONEncoder().encode(type.parameters) else { return }
        guard let dictionaryData = try? JSONSerialization.jsonObject(with: encodedData, options: []) as? [String : Any] else { return }
        let alamo = AF.request(type.url,
                               method: type.method,
                               parameters: dictionaryData,
                               encoding: JSONEncoding.default ).validate(statusCode: 200..<300)
        processRequest(alamo: alamo, completion: completion)
        
    }
    
    private func processRequest<T: Decodable> (alamo: DataRequest,
                                               completion: @escaping (T) -> Void) {
        alamo.responseJSON { (response) in
            switch response.result {
            case .success(let value):
                do {
//                    self.jsonToString(json: value)
                    let data = try JSONSerialization.data(withJSONObject: value)
                    let decodedData = try JSONDecoder().decode(T.self, from: data)
//                    print(decodedData)
                    completion(decodedData)
                } catch {
                    print(error)
                }
            case .failure(let error):
                print(error)
            }
        }
    }
    
    private func jsonToString(json: Any) -> String{
        do {
            let data1 = try JSONSerialization.data(withJSONObject: json, options: JSONSerialization.WritingOptions.prettyPrinted)
            let convertedString = String(data: data1, encoding: String.Encoding.utf8) as NSString? ?? ""
            debugPrint(convertedString)
            return convertedString as String
        } catch let myJSONError {
            debugPrint(myJSONError)
            return ""
        }
    }
}
