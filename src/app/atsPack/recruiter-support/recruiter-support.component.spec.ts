import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterSupportComponent } from './recruiter-support.component';

describe('RecruiterSupportComponent', () => {
  let component: RecruiterSupportComponent;
  let fixture: ComponentFixture<RecruiterSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecruiterSupportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
