/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UpdateShareService } from './UpdateShareService';

describe('Service: UpdateShare', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateShareService]
    });
  });

  it('should ...', inject([UpdateShareService], (service: UpdateShareService) => {
    expect(service).toBeTruthy();
  }));
});
