import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucessmsgPopupComponent } from './sucessmsg-popup.component';

describe('SucessmsgPopupComponent', () => {
  let component: SucessmsgPopupComponent;
  let fixture: ComponentFixture<SucessmsgPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SucessmsgPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SucessmsgPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
