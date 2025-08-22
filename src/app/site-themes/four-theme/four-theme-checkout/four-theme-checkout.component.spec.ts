import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourThemeCheckoutComponent } from './four-theme-checkout.component';

describe('FourThemeCheckoutComponent', () => {
  let component: FourThemeCheckoutComponent;
  let fixture: ComponentFixture<FourThemeCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FourThemeCheckoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourThemeCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
