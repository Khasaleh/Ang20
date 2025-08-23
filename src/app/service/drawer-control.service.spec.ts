/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DrawerControlService } from './drawer-control.service';

describe('Service: DrawerControl', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrawerControlService]
    });
  });

  it('should ...', inject([DrawerControlService], (service: DrawerControlService) => {
    expect(service).toBeTruthy();
  }));
});
