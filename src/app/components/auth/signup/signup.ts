import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth-service';
import { email } from '@angular/forms/signals';
import { User } from '../../../../models/user.model';
import { Business } from '../../../../models/business.model';
import { BusinessRegister } from '../../../../models/businessRegister.model';
import { Charity } from '../../../../models/charity.model';
import { CharityRegister } from '../../../../models/charityRegister.model';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  userForm!:FormGroup;
  constructor(private _authService: AuthService) {}
  ngOnInit() {
    this.userForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      role: new FormControl('Business', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required, Validators.minLength(2)]), 
      foodType: new FormControl(''),
      quantity: new FormControl('')
    });

    // האזנה לשינויים בשדה התפקיד
    this.userForm.get('role')?.valueChanges.subscribe(role => {
      const foodTypeCtrl = this.userForm.get('foodType');
      const quantityCtrl = this.userForm.get('quantity');

      if (role === 'Charity') {
        foodTypeCtrl?.setValidators([Validators.required]);
        quantityCtrl?.setValidators([Validators.required, Validators.min(1)]);
      } else {
        foodTypeCtrl?.clearValidators();
        quantityCtrl?.clearValidators();
        foodTypeCtrl?.setValue('');
        quantityCtrl?.setValue('');
      }
      
      foodTypeCtrl?.updateValueAndValidity();
      quantityCtrl?.updateValueAndValidity();
    });
  }

submit() {
    if (this.userForm.valid) {

      const userObj: User = {
      userName: this.userForm.value.userName,
      password: this.userForm.value.password,
      role: this.userForm.value.role
    };

    let requestPayload;

    // 2. אריזה לפי סוג התפקיד
    if (this.userForm.value.role === 'Business') {
      const businessObj: Business = {
        name: this.userForm.value.name,
        city: this.userForm.value.city,
        email: this.userForm.value.email
      };

      // אריזה במודל BusinessRegister
      requestPayload = {
        business: businessObj,
        user: userObj
      } as BusinessRegister;

    } else {
      const charityObj: Charity = {
        name: this.userForm.value.name,
        city: this.userForm.value.city,
        email: this.userForm.value.email,
        foodType: this.userForm.value.foodType,
        quantity: this.userForm.value.quantity
      };

      // אריזה במודל CharityRegister
      requestPayload = {
        charity: charityObj,
        user: userObj
      } as CharityRegister;
    }

    // 3. שליחה לסרוויס
    this._authService.signup(requestPayload).subscribe({
      next: () => {
        console.log('הרשמה בוצעה בהצלחה!');
        alert('נרשמת בהצלחה! כעת תוכל להתחבר.');
      },
      error: (err) => {
        console.error('שגיאה בהרשמה:', err);
        alert('התרחשה שגיאה בהרשמה. ייתכן ששם המשתמש כבר תפוס.');
      }
    });

    } else {
      this.userForm.markAllAsTouched(); 
    }
  }
}
