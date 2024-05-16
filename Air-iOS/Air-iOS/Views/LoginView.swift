//
//  LoginView.swift
//  Air-iOS
//
//  Created by Yan Blaire Dologuin on 5/14/24.
//

import SwiftUI

struct LoginView: View {
    @StateObject private var viewModel = LoginViewModel()
    @State private var isAuthenticated = false
    @State private var errorMessage: String? = nil

    var body: some View {
        NavigationStack {
            VStack {
                ZStack{
                    Image("background")
                                        .resizable()
                                        .scaledToFill()
                                        .edgesIgnoringSafeArea(.all)
                                        .blur(radius: 10)
                                        .opacity(0.5)
                    Image("nwktc-logo")
                                        .resizable()
                                        .scaledToFit()
                                        .frame(width: 300)


                }
                Text("Air - NWKTC")
                    .font(.largeTitle)
                    .padding()
                    .foregroundColor(.red)

                TextField("Email", text: $viewModel.email)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                    .padding()

                SecureField("Password", text: $viewModel.password)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                    .padding()

                if let errorMessage = errorMessage {
                    Text(errorMessage)
                        .foregroundColor(.red)
                        .padding()
                }

                Button(action: {
                    viewModel.login { success in
                        if success {
                            isAuthenticated = true
                            AppState.shared.currentUser = viewModel.user
                        } else {
                            errorMessage = "Wrong information or no user found"
                        }
                    }
                }) {
                    Text("Log In")
                        .padding()
                        .foregroundColor(.red)
                        .background(Color.black)
                        .foregroundColor(.white)
                        .cornerRadius(8)
                }
                .padding()
            }
            .navigationDestination(isPresented: $isAuthenticated) {
                BookedRoomsView()
            }
        }
    }
}

struct LoginView_Previews: PreviewProvider {
    static var previews: some View {
        LoginView()
    }
}
