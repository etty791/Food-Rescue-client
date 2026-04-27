import { Component,computed, signal } from '@angular/core';
import { Donation } from '../../../../models/donation.model'; 
import { DonationDetail } from '../donation-detail/donation-detail'; 
import { DonationsService } from '../donations-service';

@Component({
  selector: 'app-donation-list-charity',
  imports: [DonationDetail], 
  templateUrl: './donation-list-charity.html',
  styleUrl: './donation-list-charity.scss'
})
export class DonationListCharityComponent {
   donations = computed<Donation[]|null>(() => this._donationService.donations());
  constructor(public _donationService:DonationsService) {}
  ngOnInit() {
    this._donationService.getDonations();
  }

  markAsClaimed(donationId: number) {
    const foundDonation = this.donations()?.find(d => d.id === donationId);
    if (foundDonation) {
      foundDonation.isClaimed = true;
    }
  }
}