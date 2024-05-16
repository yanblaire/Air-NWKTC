//
//  BookedRoomsView.swift
//  Air-iOS
//
//  Created by Yan Blaire Dologuin on 5/14/24.
//

import SwiftUI

struct BookedRoomsView: View {
    @ObservedObject var appState = AppState.shared
    @StateObject private var viewModel = BookedRoomsViewModel()

    var body: some View {
        NavigationStack {
            VStack {
                if let user = appState.currentUser {
                    Text("Welcome, \(user.firstName) \(user.lastName)!")
                        .font(.headline)
                        .padding()

                    if viewModel.isLoading {
                        ProgressView("Loading bookings...")
                    } else if let error = viewModel.error {
                        Text("Error: \(error)")
                    } else if viewModel.bookings.isEmpty {
                        Text("No bookings found.")
                    } else {
                        List(viewModel.bookings) { booking in
                            VStack(alignment: .leading) {
                                Text("Course: \(booking.course)")
                                Text("Start: \(booking.bookingStartTime)")
                                Text("End: \(booking.bookingEndTime)")
                                Text("Duration: \(booking.bookingDuration)")
                                Text("Status: \(booking.status)")
                            }
                        }
                    }

                    Button(action: {
                        // Navigate to AvailableRoomsView
                    }) {
                        NavigationLink(destination: AvailableRoomsView()) {
                            Text("Book a room")
                                .padding()
                                .background(Color.blue)
                                .foregroundColor(.white)
                                .cornerRadius(8)
                        }
                    }
                    .padding()
                } else {
                    Text("No user data available.")
                }
            }
            .onAppear {
                if let user = appState.currentUser {
                    viewModel.fetchBookings(for: user.id)
                }
            }
        }
    }
}

struct BookedRoomsView_Previews: PreviewProvider {
    static var previews: some View {
        BookedRoomsView()
    }
}
