import { TestBed } from '@angular/core/testing';

import { OtpEmailMobileService } from './otp-email-mobile.service';

describe('OtpEmailMobileService', () => {
  let service: OtpEmailMobileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtpEmailMobileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
