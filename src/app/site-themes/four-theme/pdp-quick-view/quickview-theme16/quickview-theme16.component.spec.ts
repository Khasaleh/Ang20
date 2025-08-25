/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuickviewTheme16Component } from './quickview-theme16.component';

describe('QuickviewTheme16Component', () => {
  let component: QuickviewTheme16Component;
  let fixture: ComponentFixture<QuickviewTheme16Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickviewTheme16Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickviewTheme16Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
