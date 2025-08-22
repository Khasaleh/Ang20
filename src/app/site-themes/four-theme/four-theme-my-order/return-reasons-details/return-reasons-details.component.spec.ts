/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ReturnReasonsDetailsComponent } from './return-reasons-details.component';

describe('ReturnReasonsDetailsComponent', () => {
  let component: ReturnReasonsDetailsComponent;
  let fixture: ComponentFixture<ReturnReasonsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [ReturnReasonsDetailsComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnReasonsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
