import { Component,computed, signal } from '@angular/core';
import { Donation } from '../../../../models/donation.model'; 
import { DonationDetail } from '../donation-detail/donation-detail'; 
import { DonationsService } from '../donations-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-donation-list-charity',
  imports: [DonationDetail], 
  templateUrl: './donation-list-charity.html',
  styleUrl: './donation-list-charity.scss'
})
export class DonationListCharityComponent {
   donations = computed<Donation[]|null>(() => this._donationService.donations());
  constructor(private _donationService:DonationsService,private _route: ActivatedRoute) {}
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