/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditorderpaymentmethodComponent } from './editorderpaymentmethod.component';

describe('EditorderpaymentmethodComponent', () => {
  let component: EditorderpaymentmethodComponent;
  let fixture: ComponentFixture<EditorderpaymentmethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorderpaymentmethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorderpaymentmethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
