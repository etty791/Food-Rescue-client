import { Routes } from '@angular/router';
import { DonationAdd } from './components/donations/donation-add/donation-add';
import { DonationListCharityComponent } from './components/donations/donation-list-charity/donation-list-charity';
import { DonationListBusiness } from './components/donations/donation-list-business/donation-list-business';
import { DonationUpdate } from './components/donations/donation-update/donation-update';
import { Signup } from './components/auth/signup/signup';
import { Login } from './components/auth/login/login';
import { CharityUpdate } from './components/charities/charity-update/charity-update';
import { BusinessUpdate } from './components/businesses/business-update/business-update';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'signup', component: Signup},
    {path: 'login', component:Login},
    {path: 'donation-add', component:DonationAdd},
    {path:'donation-list-charity', component:DonationListCharityComponent},
    {path:'donation-list-business', component:DonationListBusiness},
    {path:'donation-update/:id', component:DonationUpdate},
    {path:'charity-update', component:CharityUpdate},
    {path:'business-update', component:BusinessUpdate},
    {path: '**', redirectTo: 'login'}

];
