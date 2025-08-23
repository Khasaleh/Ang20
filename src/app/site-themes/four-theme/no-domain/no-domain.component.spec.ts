/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NoDomainComponent } from './no-domain.component';

describe('NoDomainComponent', () => {
  let component: NoDomainComponent;
  let fixture: ComponentFixture<NoDomainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [NoDomainComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
