/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuickviewTheme6Component } from './quickview-theme6.component';

describe('QuickviewTheme6Component', () => {
  let component: QuickviewTheme6Component;
  let fixture: ComponentFixture<QuickviewTheme6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickviewTheme6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickviewTheme6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
