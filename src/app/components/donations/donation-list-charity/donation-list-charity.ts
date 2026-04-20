import { Component,computed } from '@angular/core';
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
 
  constructor(public _donationService:DonationsService) {}
  donations = computed<Donation[]>(() => this._donationService.donations());

  markAsClaimed(donationId: number) {
    const foundDonation = this.donations().find(d => d.id === donationId);
    if (foundDonation) {
      foundDonation.isClaimed = true;
    }
  }
}