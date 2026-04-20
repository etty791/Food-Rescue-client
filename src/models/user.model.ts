export enum UserRole {
  Admin = 'Admin',
  Business = 'Business',
  Charity = 'Charity'
}

export interface User {
  id?: number;
  userName: string;
  password?: string;
  role: UserRole;
}