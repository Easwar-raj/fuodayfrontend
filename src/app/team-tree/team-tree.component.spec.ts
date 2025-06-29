import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamTreeComponent } from './team-tree.component';

describe('TeamTreeComponent', () => {
  let component: TeamTreeComponent;
  let fixture: ComponentFixture<TeamTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamTreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
