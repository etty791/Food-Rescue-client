import { Component, computed, signal } from '@angular/core';
import { DonationsService } from '../donations-service';
import { Donation } from '../../../../models/donation.model';
import { DonationAdd } from '../donation-add/donation-add';
import { DonationDetail } from '../donation-detail/donation-detail';
import { DonationUpdate } from '../donation-update/donation-update';
import { error } from 'console';
import { Router } from '@angular/router';


@Component({
  selector: 'app-donation-list-business',
  imports: [DonationAdd, DonationDetail, DonationUpdate],
  templateUrl: './donation-list-business.html',
  styleUrl: './donation-list-business.scss',
})
export class DonationListBusiness {
  donations = computed(() => this._donationService.donations());
  // selectedDonation = signal<Donation | null>(null);

  constructor(public _donationService: DonationsService, private _router: Router) { }
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
};
