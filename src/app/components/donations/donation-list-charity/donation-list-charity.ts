import { Component,computed, signal } from '@angular/core';
import { Donation } from '../../../../models/donation.model'; 
import { DonationsService } from '../donations-service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-donation-list-charity',
  imports: [DatePipe], 
  templateUrl: './donation-list-charity.html',
  styleUrl: './donation-list-charity.scss'
})
export class DonationListCharityComponent {
   donations = computed<Donation[]|null>(() => this._donationService.donations());
  constructor(private _donationService:DonationsService,private _route: ActivatedRoute,private _router: Router) {}
  ngOnInit() {
    this._donationService.getDonations();
  }

   navigateNewDonation() {
    this._router.navigate(['/donation-add']);
  }
  navigateDonationDetails(donation: Donation) {
    this._router.navigate(['/donation-details', donation.id]);
  }
  navigateUpdateDonation(donation: Donation) {
    this._router.navigate(['/donation-update', donation.id]);
  }
  claimDonation(donation: Donation) {
    this._donationService.claimDonation(donation);
  }
}