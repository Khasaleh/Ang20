/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChatSharedInfoService } from './chat-shared-info.service';

describe('Service: ChatSharedInfo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatSharedInfoService]
    });
  });

  it('should ...', inject([ChatSharedInfoService], (service: ChatSharedInfoService) => {
    expect(service).toBeTruthy();
  }));
});
