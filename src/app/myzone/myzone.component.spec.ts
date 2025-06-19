import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyzoneComponent } from './myzone.component';

describe('MyzoneComponent', () => {
  let component: MyzoneComponent;
  let fixture: ComponentFixture<MyzoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyzoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyzoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
