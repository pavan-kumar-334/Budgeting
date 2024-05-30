import { TestBed } from '@angular/core/testing';

import { CostGroupService } from './cost-group.service';

describe('CostGroupService', () => {
  let service: CostGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
