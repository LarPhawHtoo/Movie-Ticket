import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaActionsComponent } from './cinema-actions.component';

describe('CinemaActionsComponent', () => {
  let component: CinemaActionsComponent;
  let fixture: ComponentFixture<CinemaActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CinemaActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CinemaActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
