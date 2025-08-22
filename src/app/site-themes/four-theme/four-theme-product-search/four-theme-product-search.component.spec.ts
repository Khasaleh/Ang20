import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourThemeProductSearchComponent } from './four-theme-product-search.component';

describe('FourThemeProductSearchComponent', () => {
  let component: FourThemeProductSearchComponent;
  let fixture: ComponentFixture<FourThemeProductSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FourThemeProductSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourThemeProductSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
