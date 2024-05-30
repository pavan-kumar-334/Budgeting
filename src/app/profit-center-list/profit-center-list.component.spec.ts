import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitCenterListComponent } from './profit-center-list.component';

describe('ProfitCenterListComponent', () => {
  let component: ProfitCenterListComponent;
  let fixture: ComponentFixture<ProfitCenterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfitCenterListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfitCenterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
