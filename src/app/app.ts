import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DonationListCharityComponent } from './components/donations/donation-list-charity/donation-list-charity';
import { DonationListBusiness } from './components/donations/donation-list-business/donation-list-business';
import { Signup } from './components/auth/signup/signup';
import { Login } from './components/auth/login/login';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';

@Component({
selector: 'app-root',
  imports: [RouterOutlet, DonationListCharityComponent,DonationListBusiness,Signup,Login,Header,Footer], 
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'food-rescue-client';
}