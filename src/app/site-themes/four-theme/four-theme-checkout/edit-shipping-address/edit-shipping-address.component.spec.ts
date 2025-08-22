/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditShippingAddressComponent } from './edit-shipping-address.component';

describe('EditShippingAddressComponent', () => {
  let component: EditShippingAddressComponent;
  let fixture: ComponentFixture<EditShippingAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditShippingAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditShippingAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
