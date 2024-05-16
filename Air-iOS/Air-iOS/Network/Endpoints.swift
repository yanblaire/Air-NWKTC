//
//  Endpoints.swift
//  Air-iOS
//
//  Created by Yan Blaire Dologuin on 5/14/24.
//

import Foundation

enum Endpoints {
    static let baseURL = "http://localhost:3000/api"

    static let rooms = "\(baseURL)/rooms"
    static let bookings = "\(baseURL)/bookings"
    static let login = "\(baseURL)/login/verifyLogin"
}

