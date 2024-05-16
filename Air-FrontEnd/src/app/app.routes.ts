import { Routes, RouterModule } from '@angular/router';
import { AddRoomComponent } from './add-room/add-room.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookingsComponent } from './bookings/bookings.component';
import { UsersComponent } from './users/users.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';

export const routes: Routes = [
    { path: 'add-room', component: AddRoomComponent},
    { path: 'home', component: AppComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'rooms', component: RoomsComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: 'users', component: UsersComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'room-details/:id', component: RoomDetailsComponent },
  { path: 'user-details/:id', component: UserDetailsComponent },
  { path: 'booking-details/:id', component: BookingDetailsComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }