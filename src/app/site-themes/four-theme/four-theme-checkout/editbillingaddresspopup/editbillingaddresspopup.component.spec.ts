/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditbillingaddresspopupComponent } from './editbillingaddresspopup.component';

describe('EditbillingaddresspopupComponent', () => {
  let component: EditbillingaddresspopupComponent;
  let fixture: ComponentFixture<EditbillingaddresspopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [EditbillingaddresspopupComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditbillingaddresspopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
