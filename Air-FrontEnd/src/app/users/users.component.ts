import { Component, OnInit } from '@angular/core';
import { AddUserComponent } from '../add-user/add-user.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface User {
  UserID: number;
  FirstName: string;
  LastName: string;
  Role: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AddUserComponent, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  administrators: User[] = [];
  instructors: User[] = [];
  private apiUrl = 'http://localhost:3000/api/user';  // API URL

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    fetch(this.apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }
        return response.json();
      })
      .then(users => {
        this.administrators = users.filter((user: { Role: string; }) => user.Role === 'administrator');
        this.instructors = users.filter((user: { Role: string; }) => user.Role === 'instructor');
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }
  goToUserDetails(userId: number): void {
    this.router.navigate(['/user-details', userId]);
  }
}