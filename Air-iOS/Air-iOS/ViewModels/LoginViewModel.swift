//
//  LoginViewModel.swift
//  Air-iOS
//
//  Created by Yan Blaire Dologuin on 5/14/24.
//

import Foundation

class LoginViewModel: ObservableObject {
    @Published var email: String = ""
    @Published var password: String = ""
    @Published var user: User?

    func login(completion: @escaping (Bool) -> Void) {
        APIClient.shared.login(email: email, password: password) { result in
            switch result {
            case .success(let user):
                DispatchQueue.main.async {
                    self.user = user
                    AppState.shared.currentUser = user
                    completion(true)
                }
            case .failure(let error):
                print("Login failed: \(error.localizedDescription)")
                DispatchQueue.main.async {
                    completion(false)
                }
            }
        }
    }
}
