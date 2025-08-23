/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FourContentAreaComponent } from './four-content-area.component';

describe('FourContentAreaComponent', () => {
  let component: FourContentAreaComponent;
  let fixture: ComponentFixture<FourContentAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [FourContentAreaComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FourContentAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
