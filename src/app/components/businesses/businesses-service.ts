import { Injectable, signal } from '@angular/core';
import { Donation } from '../../../models/donation.model';
import { Business } from '../../../models/business.model';

@Injectable({
  providedIn: 'root',
})
export class BusinessesService {
view=signal<'list' | 'details' | 'edit' | 'add'>('list');
businesses= signal<Business[]>([
    { id: 10, name: 'מסעדת השף', city: '  תל אביב', email: 'mis@gmail.com', password: '123456', userName: 'mis' },
    { id: 12, name: 'חנות ירקות אורגניים', city: ' חיפה', email: 'orgveg1@gmail.com', password: '123456', userName: 'orgveg1' }
  ]);
   donations= signal<Donation[]>([
    { id: 1, businessID: 10, foodType: 'לחם ומאפים', quantity: 5.5, dateTime: new Date(), isClaimed: false },
    { id: 2, businessID: 12, foodType: 'ירקות העונה', quantity: 15, dateTime: new Date(), isClaimed: true },
    { id: 3, businessID: 10, foodType: 'מוצרי חלב', quantity: 2, dateTime: new Date(), isClaimed: false }
  ]);
addBusiness(newBusiness: Business) {
    const businessWithId = { ...newBusiness, id: Date.now() };
    this.businesses.update((prev) => [...prev, businessWithId ]);
    this.view.set('list');
  }

  updateBusiness(updatedBusiness: Business) {
    this.businesses.update((list) =>
      list.map((b) => (b.id === updatedBusiness.id ? updatedBusiness : b)),
    );
    this.view.set('list');
  }
}
