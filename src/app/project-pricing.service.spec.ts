import { TestBed } from '@angular/core/testing';

import { ProjectPricingService } from './project-pricing.service';

describe('ProjectPricingService', () => {
  let service: ProjectPricingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectPricingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
