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

struct DeleteResponse: Codable {
    let numOfaffectedRows: Int
}

public class NetworkManager {
    
    func request<T: Codable, U: Codable> (type: RequestType<T>,
                        completion: @escaping (U) -> Void) {
        switch type.method {
        case .get:
            get(type: type, completion: completion)
        case .post:
            post(type: type, completion: completion)
        case .patch:
            patch()
        case .delete:
            delete(type: type, completion: completion)
        default:
            return
        }
        
    }
    
    private func processRequest<T: Decodable> (alamo: DataRequest,
                                               completion: @escaping (T) -> Void) {
        alamo.responseJSON { (response) in
            switch response.result {
            case .success(let value):
                do {
                    let data = try JSONSerialization.data(withJSONObject: value)
                    let decodedData = try JSONDecoder().decode(T.self, from: data)
                    DispatchQueue.main.async {
                        completion(decodedData)
                    }
                } catch {
                    print(error)
                }
            case .failure(let error):
                print(error)
            }
        }
    }
    
    private func get<T: Decodable, U: Decodable> (type: RequestType<T>,
                         completion: @escaping (U) -> Void) {
        let alamo = AF.request(type.url,
                               method: .get).validate(statusCode: 200..<300)
        processRequest(alamo: alamo, completion: completion)
    }
    
    private func post<T: Encodable, U: Decodable> (type: RequestType<T>,
                          completion: @escaping (U) -> Void) {
        let alamo = AF.request(type.url,
                               method: .post,
                               parameters: type.parameters,
                               encoder: JSONParameterEncoder.default).validate(statusCode: 200..<300)
        processRequest(alamo: alamo, completion: completion)
    }
    
    private func patch() {
        
    }
    
    private func delete<T: Encodable, U: Decodable> (type: RequestType<T>,
                          completion: @escaping (U) -> Void)  {
        let alamo = AF.request(type.url,
                               method: .delete).validate(statusCode: 200..<300)
        processRequest(alamo: alamo, completion: completion)
    }
    
    
}
