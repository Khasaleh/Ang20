/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuickviewTheme8Component } from './quickview-theme8.component';

describe('QuickviewTheme8Component', () => {
  let component: QuickviewTheme8Component;
  let fixture: ComponentFixture<QuickviewTheme8Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickviewTheme8Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickviewTheme8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
