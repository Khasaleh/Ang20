import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnRefundStepFormComponent } from './return-refund-step-form.component';

describe('ReturnRefundStepFormComponent', () => {
  let component: ReturnRefundStepFormComponent;
  let fixture: ComponentFixture<ReturnRefundStepFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnRefundStepFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnRefundStepFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
