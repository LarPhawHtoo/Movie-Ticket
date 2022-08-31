import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Cinema } from 'src/app/interfaces/cinema.model';
import { ActivatedRoute } from '@angular/router';
import { CreateCinemaBottomSheetComponent } from 'src/app/components/create-cinema-bottom-sheet/create-cinema-bottom-sheet.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CinemaUpdateComponent } from 'src/app/components/cinema-update/cinema-update.component';
import { CinemaDeleteConfirmDialogComponent } from 'src/app/components/cinema-delete-confirm-dialog/cinema-delete-confirm-dialog.component';
import { CinemaService } from 'src/app/services/cinema.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html',
  styleUrls: ['./cinemas.component.scss']
})
export class CinemasComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private cinemaService: CinemaService,
  ) { }

  // variables for showing cinemas
  displayedColumns: string[] = ['name', 'createdAt', 'updatedAt', 'actions'];
  dataSource = new MatTableDataSource<Cinema>();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
      this.dataSource.data = response.cinemas.data as Cinema[];
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getCinema() {
    this.cinemaService.getCinemas().pipe(
      catchError(error => {
        return of(error);
      })
    ).subscribe((response: any) => {
      this.dataSource.data = response.data as Cinema[];
    })
  }

  public doFilter = (target: any) => {
    this.dataSource.filter = target.value.trim().toLocaleLowerCase();
  }

  openUpdateDialog(element: any) {
    const dialogRef = this.dialog.open(CinemaUpdateComponent, { data: element });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'update') this.getCinema();
    })
  }
  openDeleteDialog(element: any) {
    const dialogRef = this.dialog.open(CinemaDeleteConfirmDialogComponent, { data: element });
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'delete') this.getCinema();
    })
  }

  openBottomSheet() {
    let bottomSheetRef = this.dialog.open(CreateCinemaBottomSheetComponent);
    bottomSheetRef.afterClosed().subscribe((data) => {
      if (data == "create") this.getCinema();
    });
  }

}
