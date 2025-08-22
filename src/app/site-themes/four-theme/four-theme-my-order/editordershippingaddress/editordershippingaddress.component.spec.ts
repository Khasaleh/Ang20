/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditordershippingaddressComponent } from './editordershippingaddress.component';

describe('EditordershippingaddressComponent', () => {
  let component: EditordershippingaddressComponent;
  let fixture: ComponentFixture<EditordershippingaddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditordershippingaddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditordershippingaddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
