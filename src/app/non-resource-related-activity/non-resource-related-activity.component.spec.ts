import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonResourceRelatedActivityComponent } from './non-resource-related-activity.component';

describe('NonResourceRelatedActivityComponent', () => {
  let component: NonResourceRelatedActivityComponent;
  let fixture: ComponentFixture<NonResourceRelatedActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonResourceRelatedActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonResourceRelatedActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
