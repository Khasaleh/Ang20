/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FourMainHeaderEspotComponent } from './four-main-header-espot.component';

describe('FourMainHeaderEspotComponent', () => {
  let component: FourMainHeaderEspotComponent;
  let fixture: ComponentFixture<FourMainHeaderEspotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FourMainHeaderEspotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FourMainHeaderEspotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
