/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FourBestSellingProductsComponent } from './four-best-selling-products.component';

describe('FourBestSellingProductsComponent', () => {
  let component: FourBestSellingProductsComponent;
  let fixture: ComponentFixture<FourBestSellingProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [FourBestSellingProductsComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FourBestSellingProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
