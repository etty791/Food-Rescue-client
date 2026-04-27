import { Component, input, output } from '@angular/core';
import { AbstractControl, Form, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Donation } from '../../../../models/donation.model';
import { DonationsService } from '../donations-service';
import { log } from 'node:console';

function futureDateTimeValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  const inputTime = new Date(control.value).getTime();
  const currentTime = new Date().getTime();
  return inputTime > currentTime ? null : { pastDate: true };
}
@Component({
  selector: 'app-donation-update',
  imports: [ReactiveFormsModule],
  templateUrl: './donation-update.html',
  styleUrl: './donation-update.scss',
})
export class DonationUpdate {
  donationToEdit=input.required<Donation>();
  cancel=output<void>();
  editForm!:FormGroup;
  constructor(public _donationService: DonationsService) {} 
  ngOnInit(){
    const d=this.donationToEdit();
    let formattedDateTime = '';
    if (d.dateTime) {
      const dateObj = new Date(d.dateTime);
      dateObj.setMinutes(dateObj.getMinutes() - dateObj.getTimezoneOffset());
      formattedDateTime = dateObj.toISOString().slice(0, 16); 
    }
    this.editForm=new FormGroup({
      foodType:new FormControl(d.foodType,[Validators.required, Validators.minLength(3)]),
      quantity:new FormControl(d.quantity,[Validators.required, Validators.min(10)]),
      dateTime:new FormControl(d.dateTime,[Validators.required, futureDateTimeValidator]),
    });
  }
  submit(){
    console.log("Donation to edit:", this.donationToEdit()); // בדוק מה מודפס כאן
    const updatedDonation: Donation = {
      ...this.donationToEdit(), // 1. מביא את כל השדות המקוריים שאינם בטופס (כמו businessID ו-isClaimed)
    ...this.editForm.value     
    };
    
    this._donationService.updateDonation(updatedDonation);
  }
}
