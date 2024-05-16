import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.css'
})
export class BookingDetailsComponent implements OnInit {
  booking: any = null;
  originalBookingDetails: any = null;  // This will hold the unmodified booking details
  roomDetails: any = null;
  userDetails: any = null;

  constructor(private route: ActivatedRoute, private router: Router) {}
  // Utility function to format datetime values
  formatDatetime(datetime: string): string {
    const date = new Date(datetime);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.fetchBookingDetails(+id);
      } else {
        console.error('Booking ID is null');
      }
    });
  }

  fetchBookingDetails(bookingId: number): void {
    fetch(`http://localhost:3000/api/booking/${bookingId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        this.booking = data;
        this.originalBookingDetails = JSON.parse(JSON.stringify(data));  // Make a deep copy of the data for original state
        console.log('Booking details fetched:', this.booking);

        // Fetch room details
        this.fetchRoomDetails(this.booking.RoomID);

        // Fetch user details
        this.fetchUserDetails(this.booking.InstructorUserID);
      })
      .catch(error => console.error('Error fetching booking details:', error));
  }
  fetchRoomDetails(roomId: number): void {
    fetch(`http://localhost:3000/api/room/${roomId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        this.roomDetails = data;
        console.log('Room details fetched:', this.roomDetails);
      })
      .catch(error => console.error('Error fetching room details:', error));
  }

  fetchUserDetails(userId: number): void {
    fetch(`http://localhost:3000/api/user/${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        this.userDetails = data;
        console.log('User details fetched:', this.userDetails);
      })
      .catch(error => console.error('Error fetching user details:', error));
  }

  // for some reason, it says failed to update booking but it does update in my databse.
  updateBooking(): void {
    if (!this.booking.Course || !this.booking.BookingStartTime || !this.booking.BookingEndTime) {
      window.alert('Please fill all required fields: Course, Start Time, and End Time.');
      return;
    }

    const formattedStartTime = this.formatDatetime(this.booking.BookingStartTime);
    const formattedEndTime = this.formatDatetime(this.booking.BookingEndTime);

    fetch(`http://localhost:3000/api/booking/${this.booking.BookingID}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Course: this.booking.Course,
        BookingStartTime: formattedStartTime,
        BookingEndTime: formattedEndTime,
        Status: this.booking.Status
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }
      return response.json();
    })
    .then(() => {
      window.alert('Booking updated successfully');
      this.router.navigate(['/bookings']);
    })
    .catch(error => {
      console.error('Error updating booking:', error);
      window.alert('Error updating booking, make sure Course, Start Time, and End Time is filled');
    });
  }

  confirmDeleteBooking(): void {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      this.deleteBooking();
    }
  }

  deleteBooking(): void {
    fetch(`http://localhost:3000/api/booking/${this.booking.BookingID}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }
      this.router.navigate(['/bookings']);
    })
    .catch(error => console.error('Error deleting booking:', error));
  }
  goBack(): void {
    this.router.navigate(['/bookings']);
  }
}