//
//  BookingDetailsView.swift
//  Air-iOS
//
//  Created by Yan Blaire Dologuin on 5/14/24.
//

import SwiftUI

struct BookingDetailsView: View {
    @State private var navigateToBookedRoomsView = false
    @ObservedObject var appState = AppState.shared
    @StateObject private var viewModel = BookingDetailsViewModel()
    let room: Room

    var body: some View {
            NavigationStack {
                VStack {
                    Text(room.name)
                        .font(.title)
                    Text("Capacity: \(room.capacity)")
                        .padding()

                    Form {
                        Section(header: Text("Booking Details")) {
                            TextField("Course", text: $viewModel.course)
                            DatePicker("Start Time", selection: $viewModel.bookingStartTime, displayedComponents: [.date, .hourAndMinute])
                            DatePicker("End Time", selection: $viewModel.bookingEndTime, displayedComponents: [.date, .hourAndMinute])
                        }

                        if let error = viewModel.error {
                            Text("Error: \(error)").foregroundColor(.red)
                        }

                        Button(action: {
                            if let user = appState.currentUser {
                                viewModel.bookRoom(roomID: room.id, instructorUserId: user.id) { success in
                                    if success {
                                        navigateToBookedRoomsView = true
                                    }
                                }
                            }
                        }) {
                            if viewModel.isBooking {
                                ProgressView()
                            } else {
                                Text("Book")
                            }
                        }
                    }
                    .padding()
                }
                .navigationDestination(isPresented: $navigateToBookedRoomsView) {
                    BookedRoomsView()
                }
            }
        }}

struct BookingDetailsView_Previews: PreviewProvider {
    static var previews: some View {
        BookingDetailsView(room: Room(id: 101, name: "Room 101", capacity: 20, availability: 1))
    }
}


