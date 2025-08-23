import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailPrintModalComponent } from './order-detail-print-modal.component';

describe('OrderDetailPrintModalComponent', () => {
  let component: OrderDetailPrintModalComponent;
  let fixture: ComponentFixture<OrderDetailPrintModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [OrderDetailPrintModalComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(OrderDetailPrintModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
