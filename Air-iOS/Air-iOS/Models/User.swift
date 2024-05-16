//
//  User.swift
//  Air-iOS
//
//  Created by Yan Blaire Dologuin on 5/14/24.
//

import Foundation

struct User: Codable, Identifiable {
    let id: Int
    let firstName: String
    let lastName: String
    let password: String
    let email: String
    let role: String
    let ethAddress: String

    enum CodingKeys: String, CodingKey {
        case id = "UserID"
        case firstName = "FirstName"
        case lastName = "LastName"
        case password = "Password"
        case email = "Email"
        case role = "Role"
        case ethAddress = "EthAddress"
    }
}
