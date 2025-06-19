import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterMaindashboardComponent } from './recruiter-maindashboard.component';

describe('RecruiterMaindashboardComponent', () => {
  let component: RecruiterMaindashboardComponent;
  let fixture: ComponentFixture<RecruiterMaindashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecruiterMaindashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterMaindashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
