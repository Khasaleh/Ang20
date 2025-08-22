import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourThemeComponent } from './four-theme.component';

describe('FourThemeComponent', () => {
  let component: FourThemeComponent;
  let fixture: ComponentFixture<FourThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [FourThemeComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(FourThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
