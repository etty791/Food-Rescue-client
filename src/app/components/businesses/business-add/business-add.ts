import { Component, output } from '@angular/core';
import { BusinessesService } from '../businesses-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Business } from '../../../../models/business.model';

@Component({
  selector: 'app-business-add',
  imports: [ReactiveFormsModule],
  templateUrl: './business-add.html',
  styleUrl: './business-add.scss',
})
export class BusinessAdd {
  constructor(public _businessService: BusinessesService) { }

  cancel = output<void>();
  addForm!: FormGroup;
  ngOnInit() {
    this.addForm = new FormGroup({
      id: new FormControl(0),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      city: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)]),
      userName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  submit() {
    const formValues = this.addForm.value;

    const newBusiness: Business = {
      id: 0,
      name: formValues.name,
      city: formValues.city,
      email: formValues.email,
      password: formValues.password,
      userName: formValues.userName,
    };

    this._businessService.addBusiness(newBusiness);
  }

}
