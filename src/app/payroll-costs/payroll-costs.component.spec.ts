import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollCostsComponent } from './payroll-costs.component';

describe('PayrollCostsComponent', () => {
  let component: PayrollCostsComponent;
  let fixture: ComponentFixture<PayrollCostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollCostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayrollCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
