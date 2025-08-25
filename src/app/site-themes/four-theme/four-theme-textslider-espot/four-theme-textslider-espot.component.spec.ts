/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FourThemeTextsliderEspotComponent } from './four-theme-textslider-espot.component';

describe('FourThemeTextsliderEspotComponent', () => {
  let component: FourThemeTextsliderEspotComponent;
  let fixture: ComponentFixture<FourThemeTextsliderEspotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FourThemeTextsliderEspotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FourThemeTextsliderEspotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
