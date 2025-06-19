import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterTrackerComponent } from './recruiter-tracker.component';

describe('RecruiterTrackerComponent', () => {
  let component: RecruiterTrackerComponent;
  let fixture: ComponentFixture<RecruiterTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecruiterTrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
