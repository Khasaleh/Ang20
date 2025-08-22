/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FourFooterBannerComponent } from './four-footer-banner.component';

describe('FourFooterBannerComponent', () => {
  let component: FourFooterBannerComponent;
  let fixture: ComponentFixture<FourFooterBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [FourFooterBannerComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FourFooterBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
