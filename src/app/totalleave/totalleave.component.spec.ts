import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalleaveComponent } from './totalleave.component';

describe('TotalleaveComponent', () => {
  let component: TotalleaveComponent;
  let fixture: ComponentFixture<TotalleaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TotalleaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalleaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
