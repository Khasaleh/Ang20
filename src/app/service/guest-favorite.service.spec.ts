import { TestBed } from '@angular/core/testing';

import { GuestFavoriteService } from './guest-favorite.service';

describe('GuestFavoriteService', () => {
  let service: GuestFavoriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuestFavoriteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
