import { TestBed } from '@angular/core/testing';

import { StoreUsersSessionsService } from './store-users-sessions.service';

describe('StoreUsersSessionsService', () => {
  let service: StoreUsersSessionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreUsersSessionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
