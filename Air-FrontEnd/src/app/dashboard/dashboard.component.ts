import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Import Router from Angular Router

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  totalRooms: number = 0;
  availableRooms: number = 0;
  bookedRooms: number = 0;
  totalInstructors: number = 0;  
  totalAdministrators: number = 0;  
  totalBookings: number = 0; 

  constructor(private router: Router) { }  // Inject the Router

  ngOnInit(): void {
    this.fetchDashboardData();
  }

  fetchDashboardData(): void {
    fetch('http://localhost:3000/api/dashboard/stats')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        this.totalRooms = data.totalRooms;
        this.availableRooms = data.availableRooms;
        this.bookedRooms = data.bookedRooms;
        this.totalBookings = data.totalBookings;
        this.totalInstructors = data.totalInstructors;  
        this.totalAdministrators = data.totalAdministrators;  
        // Assuming the backend sends data in this structure
      })
      .catch(error => {
        console.error('Error fetching dashboard data:', error);
      });
  }

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);  // Use the Router to navigate based on the route path provided
  }
}
