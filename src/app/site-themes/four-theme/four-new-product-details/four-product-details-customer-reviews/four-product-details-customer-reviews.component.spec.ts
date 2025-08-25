/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FourProductDetailsCustomerReviewsComponent } from './four-product-details-customer-reviews.component';

describe('FourProductDetailsCustomerReviewsComponent', () => {
  let component: FourProductDetailsCustomerReviewsComponent;
  let fixture: ComponentFixture<FourProductDetailsCustomerReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FourProductDetailsCustomerReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FourProductDetailsCustomerReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
