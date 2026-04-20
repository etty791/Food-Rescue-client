import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth-service';
import { email } from '@angular/forms/signals';
import { User } from '../../../../models/user.model';

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
      role: new FormControl('business', [Validators.required]),
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

      if (role === 'charity') {
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
      // אנחנו פשוט מעבירים את כל הערכים של הטופס לסרוויס, והוא כבר יעשה את הבדיקה!
      this._authService.signup(this.userForm.value).subscribe({
        
        next: () => {
          console.log('הרשמה בוצעה בהצלחה!');
          alert('נרשמת בהצלחה! כעת תוכל להתחבר.');
          // אחרי הרשמה מוצלחת, נעביר את המשתמש למסך ההתחברות
          // this.router.navigate(['/login']); 
        },

        error: (err) => {
          console.error('שגיאה בהרשמה:', err);
          // אם השרת מחזיר שגיאה (למשל אם שם המשתמש כבר קיים - זוכרת שעשינו את זה ב-C#?)
          alert('התרחשה שגיאה בהרשמה. ייתכן ששם המשתמש כבר תפוס.');
        }
        
      });
    } else {
      // אופציונלי: רק כדי שהמשתמש ידע שהוא פספס משהו
      this.userForm.markAllAsTouched(); 
    }
  }
}
