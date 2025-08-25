import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourThemeCancelOrderReturnRefundComponent } from './four-theme-cancel-order-return-refund.component';

describe('FourThemeCancelOrderReturnRefundComponent', () => {
  let component: FourThemeCancelOrderReturnRefundComponent;
  let fixture: ComponentFixture<FourThemeCancelOrderReturnRefundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FourThemeCancelOrderReturnRefundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourThemeCancelOrderReturnRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
