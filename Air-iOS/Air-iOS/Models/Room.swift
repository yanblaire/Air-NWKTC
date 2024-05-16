//
//  Room.swift
//  Air-iOS
//
//  Created by Yan Blaire Dologuin on 5/14/24.
//

import Foundation

struct Room: Codable, Identifiable {
    let id: Int
    let name: String
    let capacity: Int
    var availability: Int

    enum CodingKeys: String, CodingKey {
        case id = "RoomID"
        case name = "RoomName"
        case capacity = "Capacity"
        case availability = "Availability"
    }
    
    init(id: Int, name: String, capacity: Int, availability: Int) {
           self.id = id
           self.name = name
           self.capacity = capacity
           self.availability = availability
       }

}
