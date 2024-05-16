import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom, Injectable } from '@angular/core';
import { AppComponent } from './app/app.component';
import { RouterModule } from '@angular/router';
import { AddRoomComponent } from './app/add-room/add-room.component';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { BookingsComponent } from './app/bookings/bookings.component';
import { UsersComponent } from './app/users/users.component';
import { RoomsComponent } from './app/rooms/rooms.component';
import { RoomDetailsComponent } from './app/room-details/room-details.component';
import { UserDetailsComponent } from './app/user-details/user-details.component';
import { BookingDetailsComponent } from './app/booking-details/booking-details.component';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot([
      { path: 'add-room', component: AddRoomComponent },
      { path: 'dashboard', component: DashboardComponent},
      { path: 'rooms', component: RoomsComponent },
      { path: 'bookings', component: BookingsComponent},
      { path: 'users', component: UsersComponent},
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'room-details/:id', component: RoomDetailsComponent },
      { path: 'user-details/:id', component: UserDetailsComponent },
      { path: 'booking-details/:id', component: BookingDetailsComponent }
    ]))
  ]
}).catch(err => console.error(err));
