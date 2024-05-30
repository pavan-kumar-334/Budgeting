import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitCenterActivitySummaryReportComponent } from './profit-center-activity-summary-report.component';

describe('ProfitCenterActivitySummaryReportComponent', () => {
  let component: ProfitCenterActivitySummaryReportComponent;
  let fixture: ComponentFixture<ProfitCenterActivitySummaryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfitCenterActivitySummaryReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfitCenterActivitySummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
