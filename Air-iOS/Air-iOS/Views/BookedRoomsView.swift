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
                        .foregroundColor(Color.red) // Red text color
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
                            .foregroundColor(Color.red) // Red text color
                            .cornerRadius(10)
                        }
                        .background(Color.black.opacity(0.5)) // Background for the form
                    }

                    Button(action: {
                        // Navigate to AvailableRoomsView
                    }) {
                        NavigationLink(destination: AvailableRoomsView()) {
                            Text("Book a room")
                                .padding()
                                .foregroundColor(.red)
                                .background(Color.black)
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
