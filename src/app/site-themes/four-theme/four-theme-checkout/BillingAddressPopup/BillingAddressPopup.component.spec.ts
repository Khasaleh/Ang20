/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BillingAddressPopupComponent } from './BillingAddressPopup.component';

describe('BillingAddressPopupComponent', () => {
  let component: BillingAddressPopupComponent;
  let fixture: ComponentFixture<BillingAddressPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingAddressPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingAddressPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
