import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharityUpdate } from './charity-update';

describe('CharityUpdate', () => {
  let component: CharityUpdate;
  let fixture: ComponentFixture<CharityUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharityUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharityUpdate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
