/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChatopenserviceService } from './chatopenservice.service';

describe('Service: Chatopenservice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatopenserviceService]
    });
  });

  it('should ...', inject([ChatopenserviceService], (service: ChatopenserviceService) => {
    expect(service).toBeTruthy();
  }));
});
