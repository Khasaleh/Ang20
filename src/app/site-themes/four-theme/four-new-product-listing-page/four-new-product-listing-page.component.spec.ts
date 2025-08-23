/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FourNewProductListingPageComponent } from './four-new-product-listing-page.component';

describe('FourNewProductListingPageComponent', () => {
  let component: FourNewProductListingPageComponent;
  let fixture: ComponentFixture<FourNewProductListingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [FourNewProductListingPageComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FourNewProductListingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
