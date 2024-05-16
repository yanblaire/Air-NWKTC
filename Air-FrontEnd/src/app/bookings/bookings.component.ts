import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})
export class BookingsComponent implements OnInit {
  bookings: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings(): void {
    fetch('http://localhost:3000/api/booking')
      .then(response => response.json())
      .then(data => this.bookings = data)
      .catch(error => console.error('Error fetching bookings:', error));
  }

  goToBookingDetails(bookingId: number): void {
    this.router.navigate(['/booking-details', bookingId]);
  }
}
