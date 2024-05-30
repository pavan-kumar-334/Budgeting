import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostGroupListComponent } from './cost-group-list.component';

describe('CostGroupListComponent', () => {
  let component: CostGroupListComponent;
  let fixture: ComponentFixture<CostGroupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostGroupListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
