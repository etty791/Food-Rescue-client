import { Component, computed, signal } from '@angular/core';
import { DonationsService } from '../donations-service';
import { Donation } from '../../../../models/donation.model';
import { DonationAdd } from '../donation-add/donation-add';
import { DonationDetail } from '../donation-detail/donation-detail';
import { DonationUpdate } from '../donation-update/donation-update';
import { error } from 'console';


@Component({
  selector: 'app-donation-list-business',
  imports: [DonationAdd, DonationDetail, DonationUpdate],
  templateUrl: './donation-list-business.html',
  styleUrl: './donation-list-business.scss',
})
export class DonationListBusiness {
  donations = signal<Donation[]|null>(null);
  selectedDonation = signal<Donation | null>(null);

  constructor(public _donationService: DonationsService) { }
  ngOnInit() {
    this._donationService.getDonations().subscribe({
      next: (data) => {
        this.donations.set(data)
        console.log(data)
      },
      error: (err) => {
        console.error('Error fetching donations:', err);
      }
    }
    );
  }}
