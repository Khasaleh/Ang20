/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddShippingAddressComponent } from './add-shipping-address.component';

describe('AddShippingAddressComponent', () => {
  let component: AddShippingAddressComponent;
  let fixture: ComponentFixture<AddShippingAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [AddShippingAddressComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShippingAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
