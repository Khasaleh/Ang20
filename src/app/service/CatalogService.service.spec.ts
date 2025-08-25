/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CatalogServiceService } from './CatalogService.service';

describe('Service: CatalogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatalogServiceService]
    });
  });

  it('should ...', inject([CatalogServiceService], (service: CatalogServiceService) => {
    expect(service).toBeTruthy();
  }));
});
