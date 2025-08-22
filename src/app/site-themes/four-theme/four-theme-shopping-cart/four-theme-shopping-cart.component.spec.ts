import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourThemeShoppingCartComponent } from './four-theme-shopping-cart.component';

describe('FourThemeShoppingCartComponent', () => {
  let component: FourThemeShoppingCartComponent;
  let fixture: ComponentFixture<FourThemeShoppingCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FourThemeShoppingCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourThemeShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
