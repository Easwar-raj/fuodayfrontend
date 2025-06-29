import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeirarchyComponent } from './heirarchy.component';

describe('HeirarchyComponent', () => {
  let component: HeirarchyComponent;
  let fixture: ComponentFixture<HeirarchyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeirarchyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeirarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
