/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FourEspotBannerComponent } from './four-espot-banner.component';

describe('FourEspotBannerComponent', () => {
  let component: FourEspotBannerComponent;
  let fixture: ComponentFixture<FourEspotBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [FourEspotBannerComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FourEspotBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
