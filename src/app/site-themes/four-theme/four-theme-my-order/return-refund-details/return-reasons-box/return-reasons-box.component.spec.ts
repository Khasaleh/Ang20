/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ReturnReasonsBoxComponent } from './return-reasons-box.component';

describe('ReturnReasonsBoxComponent', () => {
  let component: ReturnReasonsBoxComponent;
  let fixture: ComponentFixture<ReturnReasonsBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [ReturnReasonsBoxComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnReasonsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
