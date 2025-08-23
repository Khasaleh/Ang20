/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StorehoursComponent } from './storehours.component';

describe('StorehoursComponent', () => {
  let component: StorehoursComponent;
  let fixture: ComponentFixture<StorehoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [StorehoursComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorehoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
