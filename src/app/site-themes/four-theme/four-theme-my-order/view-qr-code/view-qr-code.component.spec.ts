/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ViewQrCodeComponent } from './view-qr-code.component';

describe('ViewQrCodeComponent', () => {
  let component: ViewQrCodeComponent;
  let fixture: ComponentFixture<ViewQrCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [ViewQrCodeComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewQrCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
