import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamNodeComponent } from './team-node.component';

describe('TeamNodeComponent', () => {
  let component: TeamNodeComponent;
  let fixture: ComponentFixture<TeamNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamNodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
