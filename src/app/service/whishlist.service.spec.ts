/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WhishlistService } from './whishlist.service';

describe('Service: Whishlist', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WhishlistService]
    });
  });

  it('should ...', inject([WhishlistService], (service: WhishlistService) => {
    expect(service).toBeTruthy();
  }));
});
