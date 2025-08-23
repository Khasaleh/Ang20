/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TranslateSiteService } from './translate-site.service';

describe('Service: TranslateSite', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TranslateSiteService]
    });
  });

  it('should ...', inject([TranslateSiteService], (service: TranslateSiteService) => {
    expect(service).toBeTruthy();
  }));
});
