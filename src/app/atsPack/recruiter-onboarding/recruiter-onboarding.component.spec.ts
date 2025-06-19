import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterOnboardingComponent } from './recruiter-onboarding.component';

describe('RecruiterOnboardingComponent', () => {
  let component: RecruiterOnboardingComponent;
  let fixture: ComponentFixture<RecruiterOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecruiterOnboardingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
