/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuickviewTheme1Component } from './quickview-theme1.component';

describe('QuickviewTheme1Component', () => {
  let component: QuickviewTheme1Component;
  let fixture: ComponentFixture<QuickviewTheme1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickviewTheme1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickviewTheme1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
