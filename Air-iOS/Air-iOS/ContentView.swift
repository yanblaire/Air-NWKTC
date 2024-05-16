//
//  ContentView.swift
//  Air-iOS
//
//  Created by Yan Blaire Dologuin on 5/13/24.
//

import SwiftUI

struct ContentView: View {
    @StateObject private var appState = AppState.shared

    var body: some View {
        NavigationStack {
            if appState.currentUser != nil {
                BookedRoomsView()
            } else {
                LoginView()
            }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
