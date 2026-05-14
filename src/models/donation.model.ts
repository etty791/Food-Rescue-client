export interface Donation {
  id: number;
  charityId?: number;
  foodType: string;
  quantity: number; 
  dateTime: Date; 
  isClaimed: boolean;
  business?: {
    name: string;
    city: string;
    email: string;
  };
}