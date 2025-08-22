/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditorderpickupinfoComponent } from './editorderpickupinfo.component';

describe('EditorderpickupinfoComponent', () => {
  let component: EditorderpickupinfoComponent;
  let fixture: ComponentFixture<EditorderpickupinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorderpickupinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorderpickupinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
