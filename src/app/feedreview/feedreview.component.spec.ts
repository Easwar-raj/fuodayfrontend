import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedreviewComponent } from './feedreview.component';

describe('FeedreviewComponent', () => {
  let component: FeedreviewComponent;
  let fixture: ComponentFixture<FeedreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
