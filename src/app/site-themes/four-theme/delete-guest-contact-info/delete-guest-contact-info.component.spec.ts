import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteGuestContactInfoComponent } from './delete-guest-contact-info.component';

describe('DeleteGuestContactInfoComponent', () => {
  let component: DeleteGuestContactInfoComponent;
  let fixture: ComponentFixture<DeleteGuestContactInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteGuestContactInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteGuestContactInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
