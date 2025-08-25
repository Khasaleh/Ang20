import { TestBed } from '@angular/core/testing';

import { GuestShoppingCartService } from './guest-shopping-cart.service';

describe('GuestShoppingCartService', () => {
  let service: GuestShoppingCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuestShoppingCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
