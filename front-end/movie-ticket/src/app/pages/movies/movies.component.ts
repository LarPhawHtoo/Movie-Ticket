import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { ActivatedRoute } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Movie } from 'src/app/interfaces/movie.model';
import { catchError,of } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';
import { MovieCreateComponent } from 'src/app/components/movie-create/movie-create.component';
import { MovieDeleteConfirmDialogComponent } from 'src/app/components/movie-delete-confirm-dialog/movie-delete-confirm-dialog.component';
import { MovieUpdateComponent } from 'src/app/components/movie-update/movie-update.component';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private activatedRoute: ActivatedRoute,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    public movieService: MovieService
  ) { }

    displayedColumns: string[] = ['poster', 'code', 'name', 'year', 'rating', 'cinema-name', 'time', 'status', 'createdAt','updatedAt','actions'];
    dataSource = new MatTableDataSource<Movie>();
  
    ngOnInit(): void {
      this.activatedRoute.data.subscribe((response: any) => {
        this.dataSource.data = response.movies.movies as Movie[];
      })

      console.log(this.dataSource.data);
    }
  
    ngAfterViewInit(): void {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  
    getMovie() {
      this.movieService.getMovies().pipe(
        catchError(error => {
          return of(error);
        })).subscribe((response: any) => {

        this.dataSource.data = response.movies as Movie[];
      })
    }
  
    public doFilter = (target: any) => {
      this.dataSource.filter = target.value.trim().toLocaleLowerCase();
    }
  
    openUpdateDialog(element:any) {
      const dialogRef = this.dialog.open(MovieUpdateComponent, {data: element});
      dialogRef.afterClosed().subscribe(result => {
        if (result == 'update') this.getMovie();
      })
    }
    openDeleteDialog(element:any) {
      const dialogRef = this.dialog.open(MovieDeleteConfirmDialogComponent, { data: element });
      dialogRef.afterClosed().subscribe(result => {
        if (result == 'delete') this.getMovie();
      })
    }
  
    openDialog() {
      const dialogRef = this.dialog.open(MovieCreateComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result == 'create') this.getMovie();
      })
    }
  
  }


