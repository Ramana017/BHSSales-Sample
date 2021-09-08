import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitybyInquiryComponent } from './activityby-inquiry.component';

describe('ActivitybyInquiryComponent', () => {
  let component: ActivitybyInquiryComponent;
  let fixture: ComponentFixture<ActivitybyInquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitybyInquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitybyInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
