import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SignInService } from './sign-in.service';
import { AddRoomComponent } from './add-room/add-room.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, AddRoomComponent], // Ensure RouterOutlet is imported to use in template
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public signInService: SignInService, public sign: SignInService, private route: ActivatedRoute, private router: Router) {}

}
