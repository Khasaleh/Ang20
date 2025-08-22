import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupModalCheckoutComponent } from './signup-modal-checkout.component';

describe('SignupModalCheckoutComponent', () => {
  let component: SignupModalCheckoutComponent;
  let fixture: ComponentFixture<SignupModalCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [SignupModalCheckoutComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(SignupModalCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
