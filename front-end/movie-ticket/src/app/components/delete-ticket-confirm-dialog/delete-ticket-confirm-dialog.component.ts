import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-delete-ticket-confirm-dialog',
  templateUrl: './delete-ticket-confirm-dialog.component.html',
  styleUrls: ['./delete-ticket-confirm-dialog.component.scss']
})
export class DeleteTicketConfirmDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DeleteTicketConfirmDialogComponent>,
    private ticketService: TicketService,
    @Inject(MAT_DIALOG_DATA) public data: DeleteTicketConfirmDialogComponent,
  ) { }

  _id: string = '';

  ngOnInit(): void {
  }

  onClick(): void {
    this.dialogRef.close();
  }

  onDeleteClick(): void {
    const id = this.data._id;
    this.ticketService.deleteTicket(id)
      .subscribe(() => {
        this.dialogRef.close('delete');
      })
  }

}
