//
//  Air_iOSApp.swift
//  Air-iOS
//
//  Created by Yan Blaire Dologuin on 5/13/24.
//

import SwiftUI

@main
struct YourApp: App {

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(AppState.shared)
           
        }
    }
}
