import { TestBed } from '@angular/core/testing';

import { FavIconService } from './fav-icon.service';

describe('FavIconService', () => {
  let service: FavIconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavIconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
