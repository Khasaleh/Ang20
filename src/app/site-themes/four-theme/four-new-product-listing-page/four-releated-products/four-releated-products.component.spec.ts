/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FourReleatedProductsComponent } from './four-releated-products.component';

describe('FourReleatedProductsComponent', () => {
  let component: FourReleatedProductsComponent;
  let fixture: ComponentFixture<FourReleatedProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FourReleatedProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FourReleatedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
