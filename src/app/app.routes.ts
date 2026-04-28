import { Routes } from '@angular/router';
import { DonationAdd } from './components/donations/donation-add/donation-add';
import { DonationListCharityComponent } from './components/donations/donation-list-charity/donation-list-charity';
import { DonationListBusiness } from './components/donations/donation-list-business/donation-list-business';
import { DonationUpdate } from './components/donations/donation-update/donation-update';
import { Signup } from './components/auth/signup/signup';
import { Login } from './components/auth/login/login';
import { DonationDetail } from './components/donations/donation-detail/donation-detail';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'signup', component: Signup},
    {path: 'login', component:Login},
    {path: 'donation-add', component:DonationAdd},
    {path:'donation-list-charity', component:DonationListCharityComponent},
    {path:'donation-list-business', component:DonationListBusiness},
    {path:'donation-update/:id', component:DonationUpdate},
    {path:'donation-details/:id', component:DonationDetail},
    {path: '**', redirectTo: 'login'}

];
