/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PdpTheme8Component } from './pdp-theme8.component';

describe('PdpTheme8Component', () => {
  let component: PdpTheme8Component;
  let fixture: ComponentFixture<PdpTheme8Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdpTheme8Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdpTheme8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
