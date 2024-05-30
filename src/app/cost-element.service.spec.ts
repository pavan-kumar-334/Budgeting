import { TestBed } from '@angular/core/testing';

import { CostElementService } from './cost-element.service';

describe('CostElementService', () => {
  let service: CostElementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostElementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
