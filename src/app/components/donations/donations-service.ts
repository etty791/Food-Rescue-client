import { Injectable, signal } from '@angular/core';
import { Donation,DonationStatus } from '../../../models/donation.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth-service';

@Injectable({
  providedIn: 'root',
})
export class DonationsService {
  donations = signal<Donation[]>([]);
  availableDonations = signal<Donation[]>([]);
  claimedDonations = signal<Donation[]>([]);

  constructor(private _httpClient: HttpClient, private _authService: AuthService) { }
  // getDonations() {
  //   this._httpClient.get<Donation[]>('https://localhost:7055/api/Donation').subscribe({
  //     next: (data) => {
  //       this.donations.set(data);
  //       this.availableDonations.set(data.filter(d => d.status === 'Available'));
  //     },
  //     error: (err) => {
  //       console.error('Error fetching donations:', err);
  //     }
  //   }
  //   );
  // }
  getDonations() {
    if (this._authService.currentUser().Role === 'Charity') {
      this._httpClient.get<Donation[]>('https://localhost:7055/api/Donation').subscribe({
      next: (data) => {
        this.donations.set(data);
        this.availableDonations.set(data.filter(d => d.status === ('Available' as DonationStatus)));
      },
      error: (err) => {
        console.error('Error fetching donations:', err);
      }
    }
    );
      this._httpClient.get<Donation[]>('https://localhost:7055/api/Donation/charity').subscribe({
        next: (data) => {
          this.claimedDonations.set(data.filter(d => d.status === ('Claimed' as DonationStatus)));
        },
        error: (err) => { 
          console.error('Error fetching donations:', err);
        }
      });
    }
    else {
      this._httpClient.get<Donation[]>('https://localhost:7055/api/Donation/business').subscribe({
        next: (data) => {
          this.donations.set(data);
          this.availableDonations.set(data.filter(d => d.status ===('Available' as DonationStatus)));
          this.claimedDonations.set(data.filter(d => d.status === ('Claimed' as DonationStatus)));
          console.log('All Donations:', this.donations());
          console.log('Available Donations:', this.availableDonations());
          console.log('Claimed Donations:', this.claimedDonations());
        },
        error: (err) => {
          console.error('Error fetching donations:', err);
        }
      }
      );
    }

  }

  addDonation(newDonation: Donation) {
    this._httpClient.post('https://localhost:7055/api/Donation', newDonation)
      .subscribe({
        next: (response) => {
          console.log('התרומה נשמרה בהצלחה בשרת!', response);
          this.getDonations();
        },
        error: (err) => {
          console.error('שגיאה בשליחת התרומה לשרת:', err);
        }
      });
  }

  updateDonation(updatedDonation: Donation) {
    console.log("Donation ID to update:", updatedDonation.id); // בדוק מה מודפס כאן
    this._httpClient.put(`https://localhost:7055/api/Donation/${updatedDonation.id}`, updatedDonation).subscribe({
      next: (response) => {
        console.log('התרומה נשמרה בהצלחה בשרת!', response);
        this.getDonations();
      },
      error: (err) => {
        console.error('שגיאה בעדכון התרומה לשרת:', err);
      }
    });
  }
  claimDonation(donation: Donation) {
    this._httpClient.put(`https://localhost:7055/api/Donation/claim/${donation.id}`, {}).subscribe({
      next: (response) => {
        console.log('התרומה נclaimed בהצלחה בשרת!', response);
        this.getDonations();
      },
      error: (err) => {
        console.error('שגיאה בclaim התרומה לשרת:', err);
      }
    });
  }
  collectDonation(donation: Donation) {
    this._httpClient.put(`https://localhost:7055/api/Donation/collect/${donation.id}`, {}).subscribe({
      next: (response) => {
        console.log('התרומה נcollected בהצלחה בשרת!', response);
        this.getDonations();
      },
      error: (err) => {
        console.error('שגיאה בcollect התרומה לשרת:', err);
      }
    });
  }
  getDonationById(id: number): Observable<Donation> {
    return this._httpClient.get<Donation>(`https://localhost:7055/api/Donation/${id}`);
  }
  deleteDonation(id: number): void {
    this._httpClient.delete<Donation>(`https://localhost:7055/api/Donation/${id}`).subscribe({
      next: () => {
        console.log('התרומה נמחקה בהצלחה בשרת!');
        this.getDonations();
      },
      error: (err) => {
        console.error('שגיאה במחיקת התרומה:', err);
      }
    });
  }
}

