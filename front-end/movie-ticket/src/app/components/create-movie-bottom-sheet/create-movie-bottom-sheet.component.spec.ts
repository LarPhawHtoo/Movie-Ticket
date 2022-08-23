import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMovieBottomSheetComponent } from './create-movie-bottom-sheet.component';

describe('CreateMovieBottomSheetComponent', () => {
  let component: CreateMovieBottomSheetComponent;
  let fixture: ComponentFixture<CreateMovieBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMovieBottomSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMovieBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
