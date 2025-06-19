import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterLogComponent } from './recruiter-log.component';

describe('RecruiterLogComponent', () => {
  let component: RecruiterLogComponent;
  let fixture: ComponentFixture<RecruiterLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecruiterLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
