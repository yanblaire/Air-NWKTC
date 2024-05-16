import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-room',
  standalone: true,
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent {
  constructor(private router: Router) {}

  refreshPage() {
    window.location.reload();
  }
  
  addRoom(event: Event) {
    event.preventDefault(); // Prevent the default form submission
    const form = event.target as HTMLFormElement;

    const formData = new FormData(form);
    const roomName = formData.get('roomName') as string;
    const capacity = formData.get('capacity') as string;
    const availability = formData.get('availability') as string;

    if (!roomName || !capacity) {
      alert('Please fill all required fields.');
      return;
    }
    this.refreshPage();

    const roomData = {
      RoomName: roomName,
      Capacity: parseInt(capacity),
      Availability: availability ? true : false
    };

    fetch('http://localhost:3000/api/room/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(roomData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => console.log('Room added:', data))
    .catch(error => console.error('Error adding room:', error));
  }
}
