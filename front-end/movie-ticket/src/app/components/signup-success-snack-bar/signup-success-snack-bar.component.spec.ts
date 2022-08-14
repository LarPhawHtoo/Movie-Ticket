import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupSuccessSnackBarComponent } from './signup-success-snack-bar.component';

describe('SignupSuccessSnackBarComponent', () => {
  let component: SignupSuccessSnackBarComponent;
  let fixture: ComponentFixture<SignupSuccessSnackBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupSuccessSnackBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupSuccessSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
