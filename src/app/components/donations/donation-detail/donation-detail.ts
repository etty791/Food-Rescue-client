import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { Donation } from '../../../../models/donation.model';
import { DatePipe } from '@angular/common';
import { DonationsService } from '../donations-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-donation-detail',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './donation-detail.html',
  styleUrl: './donation-detail.scss'
})
export class DonationDetail {
  donation = signal<Donation | null>(null);
  id = 0;
  constructor(private _donationService: DonationsService, private _route: ActivatedRoute) { }
  ngOnInit() {
    this._route.params.subscribe((param) => {
      this.id = param['id'];
    });
    this._donationService.getDonationById(this.id).subscribe({
      next: (data) => {
        this.donation.set(data);
      },
      error: (err) => {
        console.error('Error fetching donation details:', err);
      }
    });
  }
}
//   @Input() donation!: Donation;
// @Input() showClaimButton: boolean = true;
//   // משדר לאבא שלחצו על הכפתור
//   @Output() claimDonation = new EventEmitter<number>();

//   // // הפונקציה שמופעלת כשהכפתור נלחץ
//   buttonClicked() {
//     this.claimDonation.emit(this.donation.id);
//   }
