import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DonationListCharityComponent } from './components/donations/donation-list-charity/donation-list-charity';
import { DonationListBusiness } from './components/donations/donation-list-business/donation-list-business';
import { Signup } from './components/auth/signup/signup';
import { Login } from './components/auth/login/login';

@Component({
selector: 'app-root',
  imports: [RouterOutlet, DonationListCharityComponent,DonationListBusiness,Signup,Login], 
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'food-rescue-client';
}