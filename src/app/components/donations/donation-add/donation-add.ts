import { Component, output, signal } from '@angular/core';
import { Donation } from '../../../../models/donation.model';
import { DonationsService } from '../donations-service';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth-service';

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
  constructor(public _donationService: DonationsService, private _authService: AuthService) { }

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
      // businessId: this._authService.currentUser()?.UserId, 
      status: 'Available',
      foodType: formValues.foodType,
      quantity: formValues.quantity,
      dateTime: formValues.expirationTime,
      business: {
        name: this._authService.currentUser()?.BusinessName || '',
        city: this._authService.currentUser()?.City || '',
        email: this._authService.currentUser()?.Email || '',
      }//TODO: להוסיף את שדות העסק מהמשתמש הנוכחי (שם, עיר, אימייל) ולשלוח אותם עם התרומה החדשה. אפשר להוסיף שדות אלו למודל Donation או לשלוח אותם בנפרד לשרת.  
    };

    this._donationService.addDonation(newDonation);
    // this._donationService.view.set('list');
  }
  navigateBack() {
    // this._donationService.view.set('list');
  }

}
