import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreLocationModalComponent } from './store-location-modal.component';

describe('StoreLocationModalComponent', () => {
  let component: StoreLocationModalComponent;
  let fixture: ComponentFixture<StoreLocationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreLocationModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreLocationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
