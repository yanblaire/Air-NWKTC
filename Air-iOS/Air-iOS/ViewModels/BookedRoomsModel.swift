//
//  BookedRoomsModel.swift
//  Air-iOS
//
//  Created by Yan Blaire Dologuin on 5/14/24.
//

import Foundation

class BookedRoomsViewModel: ObservableObject {
    @Published var bookings: [Booking] = []
    @Published var isLoading: Bool = false
    @Published var error: String? = nil

    func fetchBookings(for userId: Int) {
        isLoading = true
        APIClient.shared.fetchBookings(for: userId) { result in
            DispatchQueue.main.async {
                self.isLoading = false
                switch result {
                case .success(let bookings):
                    self.bookings = bookings
                case .failure(let error):
                    self.error = error.localizedDescription
                }
            }
        }
    }
}


