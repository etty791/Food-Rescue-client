import { Component, Input, Output, EventEmitter } from '@angular/core'; 
import { Donation } from '../../../../models/donation.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-donation-detail',
  standalone: true,
  imports: [DatePipe], 
  templateUrl: './donation-detail.html',
  styleUrl: './donation-detail.scss'
})
export class DonationDetail {
  
  // מקבל את התרומה מהאבא
  @Input() donation!: Donation;
@Input() showClaimButton: boolean = true;
  // משדר לאבא שלחצו על הכפתור
  @Output() claimDonation = new EventEmitter<number>();

  // // הפונקציה שמופעלת כשהכפתור נלחץ
  buttonClicked() {
    this.claimDonation.emit(this.donation.id);
  }
}