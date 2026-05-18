import { Component, input, output, signal } from '@angular/core';
import { AbstractControl, Form, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Charity } from '../../../../models/charity.model';
import { HttpClient } from '@angular/common/http';
import { Business } from '../../../../models/business.model';
import { AuthService } from '../../auth/auth-service';

@Component({
  selector: 'app-business-update',
  imports: [ReactiveFormsModule],
  templateUrl: './business-update.html',
  styleUrl: './business-update.scss',
})
export class BusinessUpdate {
  businessToEdit = signal<Business | null>(null);
  editForm!: FormGroup;
  constructor(private _authService: AuthService, private _httpClient: HttpClient, private _route: ActivatedRoute, private _router: Router) { }
  ngOnInit() {
    this._httpClient.get<Business>(`https://localhost:7055/api/Businesses/byUserId`).subscribe({
      next: (data) => {
        this.businessToEdit.set(data);
        this.editForm.patchValue(data);
      }
    });

    // אתחול ראשוני של הטופס
    this.editForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      city: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });

  }
  submit() {
    console.log("Business to edit:", this.businessToEdit()); // בדוק מה מודפס כאן
    const updatedBusiness: Business = {
      ...this.businessToEdit(), // 1. מביא את כל השדות המקוריים שאינם בטופס (כמו  ו-isClaimed)
      ...this.editForm.value
    };

    this._httpClient.put<Business>(`https://localhost:7055/api/Businesses`, updatedBusiness).subscribe({
      next: () => {
        this._router.navigate(['/business']);
      }
    });
  }
  navigateBack() {
    this._router.navigate(['/business']);
  }
}




