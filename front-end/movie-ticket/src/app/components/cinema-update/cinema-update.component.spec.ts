import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaUpdateComponent } from './cinema-update.component';

describe('CinemaUpdateComponent', () => {
  let component: CinemaUpdateComponent;
  let fixture: ComponentFixture<CinemaUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CinemaUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CinemaUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
