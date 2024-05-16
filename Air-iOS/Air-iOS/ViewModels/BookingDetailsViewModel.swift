//
//  BookingDetailsViewModel.swift
//  Air-iOS
//
//  Created by Yan Blaire Dologuin on 5/14/24.
//

import Foundation
import SwiftUI

class BookingDetailsViewModel: ObservableObject {
    @Published var course: String = ""
    @Published var bookingStartTime: Date = Date()
    @Published var bookingEndTime: Date = Date()
    @Published var error: String? = nil
    @Published var isBooking: Bool = false
    
    private let appState = AppState.shared
    
    func bookRoom(roomID: Int, instructorUserId: Int, completion: @escaping (Bool) -> Void) {
            guard !course.isEmpty else {
                self.error = "Course name is required."
                completion(false)
                return
            }

            let booking = Booking(roomID: roomID, instructorUserID: instructorUserId, course: course, bookingStartTime: bookingStartTime, bookingEndTime: bookingEndTime)
            
            print("Booking to send: \(booking)")

            self.isBooking = true
            APIClient.shared.bookRoom(booking: booking) { result in
                DispatchQueue.main.async {
                    switch result {
                    case .success:
                        print("Booking: \(booking)")
                    case .failure(let error):
                        self.error = error.localizedDescription
                        self.isBooking = false
                        completion(false)
                    }
                }
            }
            APIClient.shared.updateRoomAvailability(roomID: roomID) { result in
                DispatchQueue.main.async {
                    self.isBooking = false
                    switch result {
                    case .success:
                        completion(true)
                    case .failure(let error):
                        self.error = error.localizedDescription
                        completion(false)
                    }
                }
            }
        }
}
