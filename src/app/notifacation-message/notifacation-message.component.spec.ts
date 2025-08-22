import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifacationMessageComponent } from './notifacation-message.component';

describe('NotifacationMessageComponent', () => {
  let component: NotifacationMessageComponent;
  let fixture: ComponentFixture<NotifacationMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [NotifacationMessageComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(NotifacationMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
