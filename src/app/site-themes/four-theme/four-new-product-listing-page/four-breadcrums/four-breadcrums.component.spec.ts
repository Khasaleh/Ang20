/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FourBreadcrumsComponent } from './four-breadcrums.component';

describe('FourBreadcrumsComponent', () => {
  let component: FourBreadcrumsComponent;
  let fixture: ComponentFixture<FourBreadcrumsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [FourBreadcrumsComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FourBreadcrumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
