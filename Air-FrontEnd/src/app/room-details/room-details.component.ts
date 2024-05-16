import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {
  roomId: number | undefined;
  roomDetails: any = {};
  originalRoomDetails: any = null;  // This will hold the unmodified room details
  loading = true; // Add loading state
  errorMessage: string | null = null; // Add error message state

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.roomId = +id;
        if (!isNaN(this.roomId)) {
          this.fetchRoomDetails(this.roomId);
        } else {
          this.errorMessage = 'Invalid Room ID';
        }
      } else {
        this.errorMessage = 'Room ID is null';
      }
    });
  }

  fetchRoomDetails(roomId: number): void {
    this.loading = true;
    fetch(`http://localhost:3000/api/room/${roomId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        this.originalRoomDetails = JSON.parse(JSON.stringify(data));
        this.roomDetails = data;
        this.loading = false;
        console.log('Room details fetched:', this.roomDetails);
      })
      .catch(error => {
        this.loading = false;
        this.errorMessage = 'Error fetching room details';
        console.error('Error fetching room details:', error);
      });
  }

  updateRoom(): void {
    if (this.roomId === undefined) {
      console.error('Room ID is undefined');
      return;
    }

    // Check if the room name is empty
  if (!this.roomDetails.RoomName || this.roomDetails.RoomName.trim() === '') {
    alert('Room name cannot be empty.');
    return;
  }
    
    const updatedDetails = {
      ...this.roomDetails,
      availability: this.roomDetails.availability ? 1 : 0
    };

    fetch(`http://localhost:3000/api/room/${this.roomId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedDetails)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }
      return response.json();
    })
    .then(() => {
      console.log('Room updated successfully');
      this.goBack();
      
    })
    .catch(error => {
      this.errorMessage = 'Error updating room details';
      console.error('Error updating room:', error);
    });
  }

  deleteRoom(): void {
    if (this.roomId === undefined) {
      console.error('Room ID is undefined');
      return;
    }

    if (confirm('Are you sure you want to delete this room?')) {
      fetch(`http://localhost:3000/api/room/${this.roomId}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }
        console.log('Room deleted successfully');
        this.refreshPage();
      })
      .catch(error => {
        this.errorMessage = 'Error deleting room';
        console.error('Error deleting room:', error);
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/rooms']);
  }

  refreshPage() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
