import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostElementListComponent } from './cost-element-list.component';

describe('CostElementListComponent', () => {
  let component: CostElementListComponent;
  let fixture: ComponentFixture<CostElementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostElementListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostElementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
