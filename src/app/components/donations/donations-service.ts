import { Injectable, signal } from '@angular/core';
import { Donation } from '../../../models/donation.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DonationsService {
view=signal<'list' | 'details' | 'edit' | 'add'>('list');
 
donations = signal<Donation[]>([]);
constructor(private _httpClient: HttpClient) {}
getDonations(): Observable<Donation[]> {
  return this._httpClient.get<Donation[]>('https://localhost:7055/api/Donation');
}
addDonation(newDonation: Donation){
    this._httpClient.post('https://localhost:7055/api/Donation', newDonation)
    .subscribe({
      next: (response) => {
        console.log('התרומה נשמרה בהצלחה בשרת!', response);
        this.view.set('list');
      },
      error: (err) => {
        console.error('שגיאה בשליחת התרומה לשרת:', err);
      }
    });}

  updateDonation(updatedDonation: Donation) {
    this._httpClient.put('https://localhost:7055/api/Donation', updatedDonation);
    this.view.set('list');
  }
}
