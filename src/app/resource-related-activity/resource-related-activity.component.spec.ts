import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceRelatedActivityComponent } from './resource-related-activity.component';

describe('ResourceRelatedActivityComponent', () => {
  let component: ResourceRelatedActivityComponent;
  let fixture: ComponentFixture<ResourceRelatedActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceRelatedActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceRelatedActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
