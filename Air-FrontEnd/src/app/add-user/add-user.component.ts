import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  constructor(private router: Router) {}

  refreshPage() {
    window.location.reload();
  }

  addUser(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const userData = {
      FirstName: formData.get('firstName'),
      LastName: formData.get('lastName'),
      Password: formData.get('password'),
      Email: formData.get('email'),
      Role: formData.get('role'),
      EthAddress: formData.get('ethAddress') || ''
    };

    fetch('http://localhost:3000/api/user/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('User added:', data);
      this.router.navigate(['/dashboard']);  // Call to refresh the current route
    })
    .catch(error => {
      console.error('Error adding user:', error);
    });
  }
  refreshCurrentRoute() {
    this.router.navigate([this.router.url]);
  }

}