import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDeleteConfirmDialogComponent } from './movie-delete-confirm-dialog.component';

describe('MovieDeleteConfirmDialogComponent', () => {
  let component: MovieDeleteConfirmDialogComponent;
  let fixture: ComponentFixture<MovieDeleteConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieDeleteConfirmDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDeleteConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
