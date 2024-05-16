//
//  AvailableRoomsView.swift
//  Air-iOS
//
//  Created by Yan Blaire Dologuin on 5/14/24.
//

import SwiftUI

struct AvailableRoomsView: View {
    @StateObject private var viewModel = AvailableRoomsViewModel()

    var body: some View {
        NavigationStack {
            VStack {
                if viewModel.isLoading {
                    ProgressView("Loading available rooms...")
                } else if let error = viewModel.error {
                    Text("Error: \(error)")
                } else if viewModel.rooms.isEmpty {
                    Text("No available rooms found.")
                } else {
                    List(viewModel.rooms) { room in
                        NavigationLink(destination: BookingDetailsView(room: room)) {
                            VStack(alignment: .leading) {
                                Text(room.name)
                                Text("Capacity: \(room.capacity)")
                            }
                        }
                    }
                }
            }
            .onAppear {
                viewModel.fetchAvailableRooms()
            }
        }
    }
}

struct AvailableRoomsView_Previews: PreviewProvider {
    static var previews: some View {
        AvailableRoomsView()
    }
}
