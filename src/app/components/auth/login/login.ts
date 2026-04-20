import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from 'express';
import { AuthService } from '../auth-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  logInForm!:FormGroup;
  constructor(private _authService: AuthService,private router: Router) {}

  ngOnInit() {
    this.logInForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    if (this.logInForm.valid) {
      // קריאה לפונקציית ה-login בסרוויס, והעברת הערכים מהטופס
        this._authService.login( this.logInForm.value.userName, this.logInForm.value.password).subscribe({
        // מה קורה כשהשרת מחזיר תשובה חיובית (טוקן)
        next: (data) => {
          console.log('התחברות הצליחה!');
          // נעביר את המשתמש לדף הבית / לדשבורד
          // this.router.navigate(['/']); 
        },

        // מה קורה כשהשרת מחזיר שגיאה (למשל 401 - סיסמה שגויה)
        error: (err) => {
          console.error('שגיאה בהתחברות', err);
          alert('שם משתמש או סיסמה שגויים, נסה שוב.');
        }
        
      });
    }    
  }

}
