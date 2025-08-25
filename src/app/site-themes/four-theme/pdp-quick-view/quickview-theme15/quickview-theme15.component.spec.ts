/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuickviewTheme15Component } from './quickview-theme15.component';

describe('QuickviewTheme15Component', () => {
  let component: QuickviewTheme15Component;
  let fixture: ComponentFixture<QuickviewTheme15Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickviewTheme15Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickviewTheme15Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
