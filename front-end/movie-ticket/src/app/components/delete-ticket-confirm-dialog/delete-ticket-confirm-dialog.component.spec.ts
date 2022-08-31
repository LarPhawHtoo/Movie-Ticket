import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTicketConfirmDialogComponent } from './delete-ticket-confirm-dialog.component';

describe('DeleteTicketConfirmDialogComponent', () => {
  let component: DeleteTicketConfirmDialogComponent;
  let fixture: ComponentFixture<DeleteTicketConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTicketConfirmDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTicketConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
