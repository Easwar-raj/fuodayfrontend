import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterJobPortalComponent } from './recruiter-job-portal.component';

describe('RecruiterJobPortalComponent', () => {
  let component: RecruiterJobPortalComponent;
  let fixture: ComponentFixture<RecruiterJobPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecruiterJobPortalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterJobPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
