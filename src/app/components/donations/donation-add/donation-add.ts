import { Component, output, signal } from '@angular/core';
import { Donation } from '../../../../models/donation.model';
import { DonationsService } from '../donations-service';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

function futureDateTimeValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  const inputTime = new Date(control.value).getTime();
  const currentTime = new Date().getTime();
  return inputTime > currentTime ? null : { pastDate: true };
}

@Component({
  selector: 'app-donation-add',
  imports: [ReactiveFormsModule],
  templateUrl: './donation-add.html',
  styleUrl: './donation-add.scss',
})
export class DonationAdd {
  constructor(public _donationService: DonationsService) { }

  cancel = output<void>();
  addForm!: FormGroup;
  ngOnInit() {
    this.addForm = new FormGroup({
      foodType: new FormControl('', [Validators.required, Validators.minLength(3)]),
      quantity: new FormControl('', [Validators.required, Validators.min(10)]),
      expirationTime: new FormControl('', [Validators.required, futureDateTimeValidator]),
    });
  }

  submit() {
    const formValues = this.addForm.value;

    const newDonation: Donation = {
      id: 0,
      businessID: 10, //TODO: Business ID should be set based on the logged-in user's business
      isClaimed: false,
      foodType: formValues.foodType,
      quantity: formValues.quantity,
      expirationTime: new Date(formValues.expirationTime)
    };

    this._donationService.addDonation(newDonation);
    this._donationService.view.set('list');
  }

}
