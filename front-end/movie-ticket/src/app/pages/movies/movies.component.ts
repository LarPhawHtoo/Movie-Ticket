import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { ActivatedRoute } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CreateCinemaBottomSheetComponent } from 'src/app/components/create-cinema-bottom-sheet/create-cinema-bottom-sheet.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CinemaUpdateComponent } from 'src/app/components/cinema-update/cinema-update.component';
import { CinemaDeleteConfirmDialogComponent } from 'src/app/components/cinema-delete-confirm-dialog/cinema-delete-confirm-dialog.component';
import { Movie } from 'src/app/interfaces/movie.model';
import { CreateMovieBottomSheetComponent } from 'src/app/components/create-movie-bottom-sheet/create-movie-bottom-sheet.component';
import { catchError,of } from 'rxjs';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  movieService: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog) { }

    displayedColumns: string[] = ['id', 'code', 'name', 'year','ratings'];
    dataSource = new MatTableDataSource<Movie>();
  
    ngOnInit(): void {
      
      //console.log(this.dataSource.data);
      this.activatedRoute.data.subscribe((response: any) => {
        this.dataSource.data = response.movies.data as Movie[];
        console.log(this.dataSource.data);
      })
    }
  
    ngAfterViewInit(): void {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  
    getMovie() {
      this.movieService.getMovies().pipe(
        catchError(error => {
          return of(error);
        })
      ).subscribe((response: any) => {
        this.dataSource.data = response.data as Movie[];
      })
    }
  
    public doFilter = (target: any) => {
      this.dataSource.filter = target.value.trim().toLocaleLowerCase();
    }
  
    openUpdateDialog() {
      const dialogRef = this.dialog.open(CinemaUpdateComponent, {data: this.dataSource.data});
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
      })
    }
    openDeleteDialog() {
      const dialogRef = this.dialog.open(CinemaDeleteConfirmDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
      })
    }
  
    openBottomSheet() {
      let bottomSheetRef = this.bottomSheet.open(CreateMovieBottomSheetComponent);
      bottomSheetRef.afterDismissed().subscribe((data) => {
        if (data == "create") {
          this.getMovie();
        }
      });
    }
  
  }


