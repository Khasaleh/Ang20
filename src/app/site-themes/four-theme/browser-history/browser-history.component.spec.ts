import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserHistoryComponent } from './browser-history.component';

describe('BrowserHistoryComponent', () => {
  let component: BrowserHistoryComponent;
  let fixture: ComponentFixture<BrowserHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowserHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowserHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
