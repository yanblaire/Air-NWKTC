import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddRoomComponent } from '../add-room/add-room.component';

interface Room {
  RoomID: number;
  RoomName: string;
  Capacity: number;
  Availability: boolean;
}

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
  standalone: true,
  imports: [AddRoomComponent, CommonModule]
})
export class RoomsComponent implements OnInit {
  availableRooms: Room[] = [];
  bookedRooms: Room[] = [];
  private apiUrl = 'http://localhost:3000/api/room'; // Ensure this is the correct API URL

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms(): void {
    fetch(this.apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }
        return response.json();
      })
      .then(rooms => {
        console.log('Rooms loaded:', rooms);
        this.availableRooms = rooms.filter((room: Room) => room.Availability);
        this.bookedRooms = rooms.filter((room: Room) => !room.Availability);
      })
      .catch(error => {
        console.error('Error fetching rooms:', error);
      });
  }

  goToRoomDetails(roomId: number): void {
    this.router.navigate(['/room-details', roomId]);
  }
}
