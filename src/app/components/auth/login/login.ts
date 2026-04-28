import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from 'express';
import { AuthService } from '../auth-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  logInForm!:FormGroup;
  constructor(private _authService: AuthService) {}

  ngOnInit() {
    this.logInForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    if (this.logInForm.valid) {
        this._authService.login( this.logInForm.value.userName, this.logInForm.value.password).subscribe({
        next: (data) => {
          console.log('התחברות הצליחה!');
          localStorage.setItem('token', data); // שמירת הטוקן ב-localStorage
          this._authService.loadUserFromToken();
        },

        error: (err) => {
          console.error('שגיאה בהתחברות', err);
          alert('שם משתמש או סיסמה שגויים, נסה שוב.');
        }
        
      });
    }    
  }

}
