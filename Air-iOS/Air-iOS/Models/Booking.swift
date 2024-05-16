//
//  Booking.swift
//  Air-iOS
//
//  Created by Yan Blaire Dologuin on 5/14/24.
//

import Foundation

struct Booking: Codable, Identifiable {
    let id: Int?
    let roomID: Int
    let instructorUserID: Int
    let course: String
    let bookingStartTime: Date
    let bookingEndTime: Date
    let bookingDuration: String
    let status: String
    
    enum CodingKeys: String, CodingKey {
        case id = "BookingID"
        case roomID = "RoomID"
        case instructorUserID = "InstructorUserID"
        case course = "Course"
        case bookingStartTime = "BookingStartTime"
        case bookingEndTime = "BookingEndTime"
        case bookingDuration = "BookingDuration"
        case status = "Status"
    }
    
    init(id: Int? = nil, roomID: Int, instructorUserID: Int, course: String, bookingStartTime: Date, bookingEndTime: Date) {
            self.id = id
            self.roomID = roomID
            self.instructorUserID = instructorUserID
            self.course = course
            self.bookingStartTime = bookingStartTime
            self.bookingEndTime = bookingEndTime
            self.bookingDuration = Booking.calculateDuration(start: bookingStartTime, end: bookingEndTime)
            self.status = ""
        }

    private static func calculateDuration(start: Date, end: Date) -> String {
            let duration = end.timeIntervalSince(start)
            let hours = Int(duration) / 3600
            let minutes = Int(duration) % 3600 / 60
            let seconds = Int(duration) % 60
            return String(format: "%02d:%02d:%02d", hours, minutes, seconds)
        }
}
