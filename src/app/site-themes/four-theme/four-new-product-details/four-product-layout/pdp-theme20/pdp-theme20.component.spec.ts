/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PdpTheme20Component } from './pdp-theme20.component';

describe('PdpTheme20Component', () => {
  let component: PdpTheme20Component;
  let fixture: ComponentFixture<PdpTheme20Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdpTheme20Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdpTheme20Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
