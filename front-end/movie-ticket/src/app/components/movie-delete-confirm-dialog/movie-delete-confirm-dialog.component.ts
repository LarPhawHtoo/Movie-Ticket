import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-delete-confirm-dialog',
  templateUrl: './movie-delete-confirm-dialog.component.html',
  styleUrls: ['./movie-delete-confirm-dialog.component.scss']
})
export class MovieDeleteConfirmDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<MovieDeleteConfirmDialogComponent>,
    private movieService: MovieService,
    @Inject(MAT_DIALOG_DATA) public data: MovieDeleteConfirmDialogComponent,
  ) { }

  _id: string = '';

  ngOnInit(): void {
  }
  
  onClick(): void {
    this.dialogRef.close();
  }

  onDeleteClick(): void {
    const id = this.data._id;
    this.movieService.deleteMovie(id)
      .subscribe(() => {
        this.dialogRef.close('delete');
      })
  }
}