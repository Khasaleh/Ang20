/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditpickupinfoforreserveComponent } from './editpickupinfoforreserve.component';

describe('EditpickupinfoforreserveComponent', () => {
  let component: EditpickupinfoforreserveComponent;
  let fixture: ComponentFixture<EditpickupinfoforreserveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [EditpickupinfoforreserveComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpickupinfoforreserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
