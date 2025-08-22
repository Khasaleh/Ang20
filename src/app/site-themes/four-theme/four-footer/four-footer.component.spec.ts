import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourFooterComponent } from './four-footer.component';

describe('FourFooterComponent', () => {
  let component: FourFooterComponent;
  let fixture: ComponentFixture<FourFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FourFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
