import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetrackviewComponent } from './timetrackview.component';

describe('TimetrackviewComponent', () => {
  let component: TimetrackviewComponent;
  let fixture: ComponentFixture<TimetrackviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimetrackviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimetrackviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
