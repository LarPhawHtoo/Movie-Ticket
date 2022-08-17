import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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
  ) { }

  ngOnInit(): void {
  }

  onClick(): void {
    this.dialogRef.close();
  }

  onDeleteClick(): void {
    this.dialogRef.close();
  }

}
