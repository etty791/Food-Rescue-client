import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationUpdate } from './donation-update';

describe('DonationUpdate', () => {
  let component: DonationUpdate;
  let fixture: ComponentFixture<DonationUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationUpdate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
