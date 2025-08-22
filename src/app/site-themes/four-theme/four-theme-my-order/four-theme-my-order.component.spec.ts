import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourThemeMyOrderComponent } from './four-theme-my-order.component';

describe('FourThemeMyOrderComponent', () => {
  let component: FourThemeMyOrderComponent;
  let fixture: ComponentFixture<FourThemeMyOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FourThemeMyOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourThemeMyOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
