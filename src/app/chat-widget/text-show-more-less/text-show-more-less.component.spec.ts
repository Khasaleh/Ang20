/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TextShowMoreLessComponent } from './text-show-more-less.component';

describe('TextShowMoreLessComponent', () => {
  let component: TextShowMoreLessComponent;
  let fixture: ComponentFixture<TextShowMoreLessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextShowMoreLessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextShowMoreLessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
