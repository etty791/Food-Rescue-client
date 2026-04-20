export interface Donation {
  id: number;
  businessID: number;
  charityID?: number;
  foodType: string;
  quantity: number; 
  expirationTime: Date; 
  isClaimed: boolean;
}