import { TestBed } from '@angular/core/testing';

import { ConfirmedDialogServiceService } from './confirmed-dialog-service.service';

describe('ConfirmedDialogServiceService', () => {
  let service: ConfirmedDialogServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmedDialogServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
