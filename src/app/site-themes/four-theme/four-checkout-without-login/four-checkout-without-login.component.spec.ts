import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourCheckoutWithoutLoginComponent } from './four-checkout-without-login.component';

describe('FourCheckoutWithoutLoginComponent', () => {
  let component: FourCheckoutWithoutLoginComponent;
  let fixture: ComponentFixture<FourCheckoutWithoutLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FourCheckoutWithoutLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourCheckoutWithoutLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
