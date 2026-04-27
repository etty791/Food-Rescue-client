export interface Donation {
  id: number;
  businessID: number;
  charityID?: number;
  foodType: string;
  quantity: number; 
  dateTime: Date; 
  isClaimed: boolean;
}