import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterHiringComponent } from './recruiter-hiring.component';

describe('RecruiterHiringComponent', () => {
  let component: RecruiterHiringComponent;
  let fixture: ComponentFixture<RecruiterHiringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecruiterHiringComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterHiringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
