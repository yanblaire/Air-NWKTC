//
//  AppState.swift
//  Air-iOS
//
//  Created by Yan Blaire Dologuin on 5/14/24.
//

import Foundation

class AppState: ObservableObject {
    static let shared = AppState()

    @Published var currentUser: User?

    private init() {}
}
