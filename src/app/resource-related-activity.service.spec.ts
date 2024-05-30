import { TestBed } from '@angular/core/testing';

import { ResourceRelatedActivityService } from './resource-related-activity.service';

describe('ResourceRelatedActivityService', () => {
  let service: ResourceRelatedActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourceRelatedActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
