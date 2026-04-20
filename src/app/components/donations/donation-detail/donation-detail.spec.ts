import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationDetail } from './donation-detail';

describe('DonationDetail', () => {
  let component: DonationDetail;
  let fixture: ComponentFixture<DonationDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
