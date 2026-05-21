import { Component, computed, signal } from '@angular/core';
import { DonationsService } from '../donations-service';
import { Donation } from '../../../../models/donation.model';
import { DonationAdd } from '../donation-add/donation-add';
import { DonationUpdate } from '../donation-update/donation-update';
import { error, log } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donation-list-business',
  imports: [DonationAdd, DonationUpdate],
  templateUrl: './donation-list-business.html',
  styleUrl: './donation-list-business.scss',
})
export class DonationListBusiness {

claimedDonations = computed(() => this._donationService.claimedDonations());
availableDonations = computed(() => this._donationService.availableDonations());
  constructor(public _donationService: DonationsService, private _router: Router) { }
  ngOnInit() {
    this._donationService.getDonations();
    console.log('All Donations:', this._donationService.donations());
    console.log('Available Donations:', this.availableDonations());
    console.log('Claimed Donations:', this.claimedDonations());
    
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
  deleteDonation(donation: Donation) {
    if (confirm('האם אתה בטוח שברצונך למחוק את התרומה הזו?')) {
      this._donationService.deleteDonation(donation.id);
    }
  }
  confirmDonation(donation: Donation) {
      this._donationService.collectDonation(donation);
  } 
}
