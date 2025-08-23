/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Auth.interceporService } from './auth.intercepor.service';

describe('Service: Auth.intercepor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Auth.interceporService]
    });
  });

  it('should ...', inject([Auth.interceporService], (service: Auth.interceporService) => {
    expect(service).toBeTruthy();
  }));
});
