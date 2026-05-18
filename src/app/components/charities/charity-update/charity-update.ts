import { Component, input, output, signal } from '@angular/core';
import { AbstractControl, Form, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Charity } from '../../../../models/charity.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth-service';

@Component({
  selector: 'app-charity-update',
  imports: [ReactiveFormsModule],
  templateUrl: './charity-update.html',
  styleUrl: './charity-update.scss',
})


export class CharityUpdate {
  charityToEdit = signal<Charity | null>(null);
  editForm!: FormGroup;
  id = 0;
  constructor(private _authService: AuthService, private _httpClient: HttpClient, private _route: ActivatedRoute, private _router: Router) { }
  ngOnInit() {
    this._httpClient.get<Charity>(`https://localhost:7055/api/Charities/byUserId`).subscribe({
      next: (data) => {
        this.charityToEdit.set(data);
        this.editForm.patchValue(data);
      }
    });

    // אתחול ראשוני של הטופס
    this.editForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    city: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    foodType: new FormControl('', [Validators.required, Validators.minLength(3)]),
    quantity: new FormControl(0, [Validators.required, Validators.min(10)]),
  });

  }
submit() {
  console.log("Charity to edit:", this.charityToEdit()); // בדוק מה מודפס כאן
  const updatedCharity: Charity = {
    ...this.charityToEdit(),
    ...this.editForm.value
  };

  this._httpClient.put<Charity>(`https://localhost:7055/api/Charities`, updatedCharity).subscribe({
    next: () => {
      this._router.navigate(['/charity']);
    }
  });
}
navigateBack() {
  this._router.navigate(['/charity']);
}
}




