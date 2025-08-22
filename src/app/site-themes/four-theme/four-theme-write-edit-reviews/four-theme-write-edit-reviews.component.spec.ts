import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourThemeWriteEditReviewsComponent } from './four-theme-write-edit-reviews.component';

describe('FourThemeWriteEditReviewsComponent', () => {
  let component: FourThemeWriteEditReviewsComponent;
  let fixture: ComponentFixture<FourThemeWriteEditReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FourThemeWriteEditReviewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourThemeWriteEditReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
