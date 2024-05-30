import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateprojectPriceByTMComponent } from './updateproject-price-by-t-m.component';

describe('UpdateprojectPriceByTMComponent', () => {
  let component: UpdateprojectPriceByTMComponent;
  let fixture: ComponentFixture<UpdateprojectPriceByTMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateprojectPriceByTMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateprojectPriceByTMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
