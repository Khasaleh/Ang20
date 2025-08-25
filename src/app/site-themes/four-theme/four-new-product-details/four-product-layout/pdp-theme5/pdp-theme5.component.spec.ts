/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PdpTheme5Component } from './pdp-theme5.component';

describe('PdpTheme5Component', () => {
  let component: PdpTheme5Component;
  let fixture: ComponentFixture<PdpTheme5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdpTheme5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdpTheme5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
