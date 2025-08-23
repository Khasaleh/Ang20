/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChatBackendQueriesService } from './chat-backend-queries.service';

describe('Service: ChatBackendQueries', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatBackendQueriesService]
    });
  });

  it('should ...', inject([ChatBackendQueriesService], (service: ChatBackendQueriesService) => {
    expect(service).toBeTruthy();
  }));
});
