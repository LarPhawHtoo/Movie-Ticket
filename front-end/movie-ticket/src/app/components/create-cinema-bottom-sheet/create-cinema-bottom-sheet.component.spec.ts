import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCinemaBottomSheetComponent } from './create-cinema-bottom-sheet.component';

describe('CreateCinemaBottomSheetComponent', () => {
  let component: CreateCinemaBottomSheetComponent;
  let fixture: ComponentFixture<CreateCinemaBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCinemaBottomSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCinemaBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
