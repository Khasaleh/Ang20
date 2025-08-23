import { TestBed } from '@angular/core/testing';

import { CookieDataServiceService } from './cookie-data-service.service';

describe('CookieDataServiceService', () => {
  let service: CookieDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookieDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
