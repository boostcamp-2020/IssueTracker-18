//
//  NetworkManager.swift
//  IssueTracker
//
//  Created by A on 2020/11/05.
//

import Foundation
import Alamofire

struct RequestType<T: Codable> {
    var baseUrl: String = "http://49.50.173.66/api/"
    let endPoint: String
    let method: HTTPMethod
    let parameters: T?
}

public class NetworkManager {
    
    enum NetworkError: LocalizedError {
        case noRequest
        case urlNotSupport
        case noData
        case dataNotConvert
        var errorDescription: String? {
            switch self {
            case .noRequest: return "GET HTTP request failed"
            case .urlNotSupport: return "URL NOT Supported"
            case .noData: return "Has No Data"
            case .dataNotConvert: return "Trying to convert JSON data to string failed"
            }
        }
    }
    
    func request<T: Codable, U: Codable> (type: RequestType<T>,
                        completion: @escaping (U) -> Void) {
        switch type.method {
        case .get:
            getData(type: type, completion: completion)
        case .post:
            postData(type: type, completion: completion)
        case .patch:
            patchData()
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
                    print(NetworkError.noData)
                }
            case .failure(let error):
                print(error)
            }
        }
    }
    
    private func getData<T: Decodable, U: Decodable> (type: RequestType<T>,
                         completion: @escaping (U) -> Void) {
        let url = type.baseUrl + type.endPoint
        let alamo = AF.request(url, method: .get).validate(statusCode: 200..<300)
        processRequest(alamo: alamo, completion: completion)
    }
    
    private func postData<T: Encodable, U: Decodable> (type: RequestType<T>,
                          completion: @escaping (U) -> Void) {
        let url = type.baseUrl + type.endPoint
        let alamo = AF.request(url,
                               method: .post,
                               parameters: type.parameters,
                               encoder: JSONParameterEncoder.default).validate(statusCode: 200..<300)
        processRequest(alamo: alamo, completion: completion)
    }
    
    private func patchData() {
        
    }
    
}
