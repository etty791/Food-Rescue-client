import { Component, input, output, signal } from '@angular/core';
import { AbstractControl, Form, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Donation } from '../../../../models/donation.model';
import { DonationsService } from '../donations-service';
import { log } from 'node:console';
import { ActivatedRoute, Router } from '@angular/router';

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
  donationToEdit = signal<Donation | null>(null);
  editForm!: FormGroup;
  id = 0;
  constructor(public _donationService: DonationsService, private _route: ActivatedRoute,private _router: Router) { }
  ngOnInit() {
    this._route.params.subscribe((param) => {
      this.id = param['id'];

      this._donationService.getDonationById(this.id).subscribe({
        next: (data) => {
          this.donationToEdit.set(data);
          this.editForm.patchValue(data);
        }
      });
    });

    // אתחול ראשוני של הטופס
    this.editForm = new FormGroup({
      foodType: new FormControl('', [Validators.required, Validators.minLength(3)]),
      quantity: new FormControl(0, [Validators.required, Validators.min(10)]),
      dateTime: new FormControl('', [Validators.required, futureDateTimeValidator]),
    });

  }
  submit() {
    console.log("Donation to edit:", this.donationToEdit()); // בדוק מה מודפס כאן
    const updatedDonation: Donation = {
      ...this.donationToEdit(), // 1. מביא את כל השדות המקוריים שאינם בטופס (כמו businessID ו-isClaimed)
      ...this.editForm.value
    };

    this._donationService.updateDonation(updatedDonation);
    this._router.navigate(['/donation-list-business']);
  }
  navigateBack() {
    this._router.navigate(['/donation-list-business']);
  }
}
