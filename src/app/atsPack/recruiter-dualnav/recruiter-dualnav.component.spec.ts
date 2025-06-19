import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterDualnavComponent } from './recruiter-dualnav.component';

describe('RecruiterDualnavComponent', () => {
  let component: RecruiterDualnavComponent;
  let fixture: ComponentFixture<RecruiterDualnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecruiterDualnavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterDualnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
