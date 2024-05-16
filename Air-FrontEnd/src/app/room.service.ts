import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = 'http://localhost:3000/room'; // Adjust the URL based on your actual API endpoint

  constructor() {}

  getRooms(): Promise<any> {
    console.log('Fetching rooms from:', this.apiUrl);
    return fetch(this.apiUrl)
      .then(response => {
        console.log('Fetch response:', response);
        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Data received:', data);
        return data;
      })
      .catch(error => {
        console.error('Fetch error:', error);
        throw error;
      });
  }



  getRoomDetails(id: number): Promise<any> {
    return fetch(`${this.apiUrl}/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => console.error('Error fetching room details:', error));
  }

  addRoom(roomData: { RoomName: string, Capacity: number, Availability: boolean }): Promise<any> {
    return fetch(this.apiUrl + '/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(roomData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => console.error('Error adding room:', error));
  }

  updateRoom(id: number, roomData: { RoomName: string, Capacity: number, Availability: boolean }): Promise<any> {
    return fetch(`${this.apiUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(roomData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => console.error('Error updating room:', error));
  }

  deleteRoom(id: number): Promise<any> {
    return fetch(`${this.apiUrl}/${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.statusText; // DELETE usually does not return content
    })
    .catch(error => console.error('Error deleting room:', error));
  }
}
