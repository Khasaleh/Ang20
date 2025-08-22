/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FourBrandLogosSliderComponent } from './four-brand-logos-slider.component';

describe('FourBrandLogosSliderComponent', () => {
  let component: FourBrandLogosSliderComponent;
  let fixture: ComponentFixture<FourBrandLogosSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FourBrandLogosSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FourBrandLogosSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
