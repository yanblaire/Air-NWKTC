import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
  userDetails: any = {};
  originalUserDetails: any = null; 

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) { // Check if 'id' is not null
        this.fetchUserDetails(+id); // Convert 'id' to a number and fetch details
      } else {
        console.error('User ID is null');
        // Handle the case where ID is null, maybe redirect or show an error message
      }
    });
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
        this.userDetails = data; // Holds the data for editing
        this.originalUserDetails = JSON.parse(JSON.stringify(data)); // Deep copy to avoid reference issues
        console.log('User details fetched:', this.userDetails);
      })
      .catch(error => {
        console.error('Failed to fetch user details:', error);
        // Handle errors appropriately in your application
      });
}

  updateUser(): void {
    fetch(`http://localhost:3000/api/user/${this.userDetails.UserID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.userDetails)
    })
    .then(response => {
      if (!response.ok) throw new Error('Failed to update user');
      console.log('User updated successfully');
      this.goBack();
    })
    .catch(error => console.error('Error updating user:', error));
  }

  deleteUser(): void {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (confirmed) {
      fetch(`http://localhost:3000/api/user/${this.userDetails.UserID}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (!response.ok) throw new Error('Failed to delete user');
        window.alert('User deleted successfully');
        this.router.navigate(['/users']); // Or any other route
      })
      .catch(error => console.error('Error deleting user:', error));
    }
  }


  goBack(): void {
    this.router.navigate(['/users']); // Navigate back to the user list
  }
}

