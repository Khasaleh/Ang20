/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PdpTheme14Component } from './pdp-theme14.component';

describe('PdpTheme14Component', () => {
  let component: PdpTheme14Component;
  let fixture: ComponentFixture<PdpTheme14Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdpTheme14Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdpTheme14Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
