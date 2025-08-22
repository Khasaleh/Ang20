/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ShippingAddressPopupComponent } from './shipping-address-popup.component';

describe('ShippingAddressPopupComponent', () => {
  let component: ShippingAddressPopupComponent;
  let fixture: ComponentFixture<ShippingAddressPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [ShippingAddressPopupComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingAddressPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
