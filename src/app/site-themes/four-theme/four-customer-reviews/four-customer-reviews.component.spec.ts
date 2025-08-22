/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FourCustomerReviewsComponent } from './four-customer-reviews.component';

describe('FourCustomerReviewsComponent', () => {
  let component: FourCustomerReviewsComponent;
  let fixture: ComponentFixture<FourCustomerReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [FourCustomerReviewsComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FourCustomerReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
