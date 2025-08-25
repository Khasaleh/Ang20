/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PickOrderPersonPopupComponent } from './pick-order-person-popup.component';

describe('PickOrderPersonPopupComponent', () => {
  let component: PickOrderPersonPopupComponent;
  let fixture: ComponentFixture<PickOrderPersonPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [PickOrderPersonPopupComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickOrderPersonPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
