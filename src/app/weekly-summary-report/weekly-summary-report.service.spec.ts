import { TestBed } from '@angular/core/testing';

import { WeeklySummaryReportService } from './weekly-summary-report.service';

describe('WeeklySummaryReportService', () => {
  let service: WeeklySummaryReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeeklySummaryReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
