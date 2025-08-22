/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProofofPickupComponent } from './ProofofPickup.component';

describe('ProofofPickupComponent', () => {
  let component: ProofofPickupComponent;
  let fixture: ComponentFixture<ProofofPickupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [ProofofPickupComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProofofPickupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
