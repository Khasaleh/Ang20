import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanksForloginModalComponent } from './thanks-forlogin-modal.component';

describe('ThanksForloginModalComponent', () => {
  let component: ThanksForloginModalComponent;
  let fixture: ComponentFixture<ThanksForloginModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ThanksForloginModalComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(ThanksForloginModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
