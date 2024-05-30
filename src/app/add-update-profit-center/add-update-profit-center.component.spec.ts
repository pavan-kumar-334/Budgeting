import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateProfitCenterComponent } from './add-update-profit-center.component';

describe('AddUpdateProfitCenterComponent', () => {
  let component: AddUpdateProfitCenterComponent;
  let fixture: ComponentFixture<AddUpdateProfitCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateProfitCenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateProfitCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
