/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PdpTheme10Component } from './pdp-theme10.component';

describe('PdpTheme10Component', () => {
  let component: PdpTheme10Component;
  let fixture: ComponentFixture<PdpTheme10Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdpTheme10Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdpTheme10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
