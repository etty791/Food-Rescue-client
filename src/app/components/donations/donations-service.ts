import { Injectable, signal } from '@angular/core';
import { Donation } from '../../../models/donation.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DonationsService {
  view = signal<'list' | 'details' | 'edit' | 'add'>('list');

  donations = signal<Donation[]>([]);
  constructor(private _httpClient: HttpClient) { }
  getDonations() {
     this._httpClient.get<Donation[]>('https://localhost:7055/api/Donation').subscribe({
      next: (data) => {
        this.donations.set(data);
      },
      error: (err) => {
        console.error('Error fetching donations:', err);
      }
    }
    );
  }
  addDonation(newDonation: Donation) {
    this._httpClient.post('https://localhost:7055/api/Donation', newDonation)
      .subscribe({
        next: (response) => {
          console.log('התרומה נשמרה בהצלחה בשרת!', response);
          this.getDonations();
          this.view.set('list');
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
        this.view.set('list');
      },
      error: (err) => {
        console.error('שגיאה בעדכון התרומה לשרת:', err);
      }
    });
  }
  getDonationById(id: number): Observable<Donation> {
    return this._httpClient.get<Donation>(`https://localhost:7055/api/Donation/${id}`);
  }
}

