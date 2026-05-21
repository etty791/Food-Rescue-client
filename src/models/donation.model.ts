export type DonationStatus = 'Available' | 'Claimed' | 'Collected';
export interface Donation {
  id: number;
  // charityId?: number;
  foodType: string;
  quantity: number; 
  dateTime: Date; 
  status: DonationStatus;
  business?: {
    name: string;
    city: string;
    email: string;
  };
  charity?: {
    name: string;
    city: string;
    email: string;
  };
}