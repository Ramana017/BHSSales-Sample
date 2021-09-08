import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralCategoryComponent } from './referral-category.component';

describe('ReferralCategoryComponent', () => {
  let component: ReferralCategoryComponent;
  let fixture: ComponentFixture<ReferralCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferralCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
