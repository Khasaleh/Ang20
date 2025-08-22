import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourThemeReviewsComponent } from './four-theme-reviews.component';

describe('FourThemeReviewsComponent', () => {
  let component: FourThemeReviewsComponent;
  let fixture: ComponentFixture<FourThemeReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FourThemeReviewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourThemeReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
