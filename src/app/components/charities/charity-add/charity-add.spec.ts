import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharityAdd } from './charity-add';

describe('CharityAdd', () => {
  let component: CharityAdd;
  let fixture: ComponentFixture<CharityAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharityAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharityAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
