import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklySummaryReportComponent } from './weekly-summary-report.component';

describe('WeeklySummaryReportComponent', () => {
  let component: WeeklySummaryReportComponent;
  let fixture: ComponentFixture<WeeklySummaryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklySummaryReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklySummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
