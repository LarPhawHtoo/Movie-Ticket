import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTicketDialogComponent } from './create-ticket-dialog.component';

describe('CreateTicketDialogComponent', () => {
  let component: CreateTicketDialogComponent;
  let fixture: ComponentFixture<CreateTicketDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTicketDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTicketDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
