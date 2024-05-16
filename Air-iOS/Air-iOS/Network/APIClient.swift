//
//  APIClient.swift
//  Air-iOS
//
//  Created by Yan Blaire Dologuin on 5/14/24.
//

import Foundation

class APIClient {
    static let shared = APIClient()
    private init() {}
    
    private let encoder: JSONEncoder = {
            let encoder = JSONEncoder()
            encoder.dateEncodingStrategy = .iso8601
            return encoder
        }()
    
    private let decoder: JSONDecoder = {
            let decoder = JSONDecoder()
            
            let dateFormatter = DateFormatter()
            dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXXXX"
            decoder.dateDecodingStrategy = .formatted(dateFormatter)
            
            return decoder
        }()
    private let decoder2: JSONDecoder = {
            let decoder = JSONDecoder()
            decoder.dateDecodingStrategy = .iso8601
            return decoder
        }()



    func login(email: String, password: String, completion: @escaping (Result<User, Error>) -> Void) {
        guard let url = URL(string: Endpoints.login) else { return }

        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")

        let body: [String: String] = ["email": email, "password": password]
        request.httpBody = try? JSONSerialization.data(withJSONObject: body)

        URLSession.shared.dataTask(with: request) { data, response, error in
            if let error = error {
                completion(.failure(error))
                return
            }

            guard let data = data else {
                completion(.failure(NSError(domain: "", code: -1, userInfo: [NSLocalizedDescriptionKey: "No data received"])))
                return
            }

            do {
                let user = try JSONDecoder().decode(User.self, from: data)
                completion(.success(user))
            } catch {
                completion(.failure(error))
            }
        }.resume()
    }
    
    // New method to fetch bookings for the logged-in user
    func fetchBookings(for userId: Int, completion: @escaping (Result<[Booking], Error>) -> Void) {
            guard let url = URL(string: "\(Endpoints.baseURL)/booking/user/\(userId)") else { return }

            var request = URLRequest(url: url)
            request.httpMethod = "GET"

            URLSession.shared.dataTask(with: request) { data, response, error in
                if let error = error {
                    completion(.failure(error))
                    return
                }

                guard let data = data else {
                    completion(.failure(NSError(domain: "", code: -1, userInfo: [NSLocalizedDescriptionKey: "No data received"])))
                    return
                }

                do {
                    print("Received data: \(String(data: data, encoding: .utf8) ?? "No data")")
                    let bookings = try self.decoder.decode([Booking].self, from: data)
                    completion(.success(bookings))
                } catch {
                    print("Decoding error: \(error)")
                    completion(.failure(error))
                }
            }.resume()
        }
    
    func fetchAvailableRooms(completion: @escaping (Result<[Room], Error>) -> Void) {
            guard let url = URL(string: "\(Endpoints.baseURL)/room") else { return }

            var request = URLRequest(url: url)
            request.httpMethod = "GET"

            URLSession.shared.dataTask(with: request) { data, response, error in
                if let error = error {
                    completion(.failure(error))
                    return
                }

                guard let data = data else {
                    completion(.failure(NSError(domain: "", code: -1, userInfo: [NSLocalizedDescriptionKey: "No data received"])))
                    return
                }

                do {
                    if let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode != 200 {
                        let message = HTTPURLResponse.localizedString(forStatusCode: httpResponse.statusCode)
                        completion(.failure(NSError(domain: "", code: httpResponse.statusCode, userInfo: [NSLocalizedDescriptionKey: message])))
                    } else {
                        let rooms = try self.decoder.decode([Room].self, from: data)
                        let availableRooms = rooms.filter { $0.availability == 1 }
                        completion(.success(availableRooms))
                    }
                } catch {
                    print("Decoding error: \(error)")
                    completion(.failure(error))
                }
            }.resume()
        }
    
    func bookRoom(booking: Booking, completion: @escaping (Result<Booking, Error>) -> Void) {
            guard let url = URL(string: "\(Endpoints.baseURL)/booking") else { return }

            var request = URLRequest(url: url)
            request.httpMethod = "POST"
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
            do {
                request.httpBody = try encoder.encode(booking)
            } catch {
                completion(.failure(error))
                return
            }

            URLSession.shared.dataTask(with: request) { data, response, error in
                if let error = error {
                    completion(.failure(error))
                    return
                }

                guard let data = data else {
                    completion(.failure(NSError(domain: "", code: -1, userInfo: [NSLocalizedDescriptionKey: "No data received"])))
                    return
                }
                
                // Logging the response for debugging
                print("Response data: \(String(data: data, encoding: .utf8) ?? "No data")")

                do {
                    let booking = try self.decoder.decode(Booking.self, from: data)
                    completion(.success(booking))
                } catch {
                    completion(.failure(error))
                }
            }.resume()
        }

    func updateRoomAvailability(roomID: Int, completion: @escaping (Result<Room, Error>) -> Void) {
        guard let url = URL(string: "\(Endpoints.baseURL)/room/updateAvailability/\(roomID)") else { return }

        var request = URLRequest(url: url)
        request.httpMethod = "PUT"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")

        let body: [String: Int] = ["Availability": 0]

        do {
            request.httpBody = try JSONSerialization.data(withJSONObject: body)
        } catch {
            completion(.failure(error))
            return
        }

        URLSession.shared.dataTask(with: request) { data, response, error in
            if let error = error {
                completion(.failure(error))
                return
            }

            guard let data = data else {
                completion(.failure(NSError(domain: "", code: -1, userInfo: [NSLocalizedDescriptionKey: "No data received"])))
                return
            }
            
            // Logging the response for debugging
            print("Update Room Availability Response data: \(String(data: data, encoding: .utf8) ?? "No data")")
            

            do {
                let updatedRoom = try self.decoder.decode(Room.self, from: data)
                completion(.success(updatedRoom))
            } catch {
                completion(.failure(error))
            }
        }.resume()
    }}
