import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth-service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  logInForm!: FormGroup;
  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
    this.logInForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    if (this.logInForm.valid) {
      this._authService.login(this.logInForm.value.userName, this.logInForm.value.password).subscribe({
        next: (data) => {
          console.log('התחברות הצליחה!');
          localStorage.setItem('token', data); // שמירת הטוקן ב-localStorage
          this._authService.loadUserFromToken();
          if (this._authService.currentUser()?.Role === 'Charity') {
            this._router.navigate(['/donation-list-charity']);
          }
          else {
            this._router.navigate(['/donation-list-business']);
          }
        },

        error: (err) => {
          console.error('שגיאה בהתחברות', err);
          alert('שם משתמש או סיסמה שגויים, נסה שוב.');
        }

      });
    }
  }

}
