/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TokenStorgeServiceService } from './TokenStorgeService.service';

describe('Service: TokenStorgeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenStorgeServiceService]
    });
  });

  it('should ...', inject([TokenStorgeServiceService], (service: TokenStorgeServiceService) => {
    expect(service).toBeTruthy();
  }));
});
