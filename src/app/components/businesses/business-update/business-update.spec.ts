import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessUpdate } from './business-update';

describe('BusinessUpdate', () => {
  let component: BusinessUpdate;
  let fixture: ComponentFixture<BusinessUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessUpdate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
