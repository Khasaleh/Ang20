import { TestBed } from '@angular/core/testing';

import { BusinessSettingService } from './business-setting.service';

describe('BusinessSettingService', () => {
  let service: BusinessSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
