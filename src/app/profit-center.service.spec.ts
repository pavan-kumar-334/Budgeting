import { TestBed } from '@angular/core/testing';

import { ProfitCenterService } from './profit-center.service';

describe('ProfitCenterService', () => {
  let service: ProfitCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfitCenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
