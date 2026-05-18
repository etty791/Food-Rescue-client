import { Charity } from "./charity.model";
import { User } from "./user.model";

export interface CharityRegister{
    charity: Charity;
    user: User;
}