import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourThemeCancelOrderComponent } from './four-theme-cancel-order.component';

describe('FourThemeCancelOrderComponent', () => {
  let component: FourThemeCancelOrderComponent;
  let fixture: ComponentFixture<FourThemeCancelOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [FourThemeCancelOrderComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(FourThemeCancelOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
