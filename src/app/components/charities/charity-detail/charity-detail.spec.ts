import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharityDetail } from './charity-detail';

describe('CharityDetail', () => {
  let component: CharityDetail;
  let fixture: ComponentFixture<CharityDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharityDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharityDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
