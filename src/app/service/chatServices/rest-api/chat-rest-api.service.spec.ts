/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChatRestApiService } from './chat-rest-api.service';

describe('Service: ChatRestApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatRestApiService]
    });
  });

  it('should ...', inject([ChatRestApiService], (service: ChatRestApiService) => {
    expect(service).toBeTruthy();
  }));
});
