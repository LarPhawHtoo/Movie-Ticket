import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CinemaService } from 'src/app/services/cinema.service';

@Component({
  selector: 'app-cinema-delete-confirm-dialog',
  templateUrl: './cinema-delete-confirm-dialog.component.html',
  styleUrls: ['./cinema-delete-confirm-dialog.component.scss']
})
export class CinemaDeleteConfirmDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<CinemaDeleteConfirmDialogComponent>,
    private cinemaService: CinemaService,
    @Inject(MAT_DIALOG_DATA) public data: CinemaDeleteConfirmDialogComponent,
  ) { }

  _id: string = '';

  ngOnInit(): void {
  }

  onClick(): void {
    this.dialogRef.close();
  }

  onDeleteClick(): void {
    const id = this.data._id;
    this.cinemaService.deleteCinema(id)
    .subscribe(() => {
      this.dialogRef.close('delete');
    });
  }

}
