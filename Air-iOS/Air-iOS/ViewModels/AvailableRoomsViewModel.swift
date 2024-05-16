//
//  AvailableRoomsViewModel.swift
//  Air-iOS
//
//  Created by Yan Blaire Dologuin on 5/14/24.
//

import Foundation

class AvailableRoomsViewModel: ObservableObject {
    @Published var rooms: [Room] = []
    @Published var isLoading: Bool = false
    @Published var error: String? = nil

    func fetchAvailableRooms() {
        isLoading = true
        APIClient.shared.fetchAvailableRooms { result in
            DispatchQueue.main.async {
                self.isLoading = false
                switch result {
                case .success(let rooms):
                    self.rooms = rooms
                case .failure(let error):
                    self.error = error.localizedDescription
                }
            }
        }
    }
}
