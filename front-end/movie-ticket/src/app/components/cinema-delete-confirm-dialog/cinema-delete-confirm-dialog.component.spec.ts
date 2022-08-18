import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaDeleteConfirmDialogComponent } from './cinema-delete-confirm-dialog.component';

describe('CinemaDeleteConfirmDialogComponent', () => {
  let component: CinemaDeleteConfirmDialogComponent;
  let fixture: ComponentFixture<CinemaDeleteConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CinemaDeleteConfirmDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CinemaDeleteConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
