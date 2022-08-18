import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Cinema } from 'src/app/interfaces/cinema.model';
import { ActivatedRoute } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CreateCinemaBottomSheetComponent } from 'src/app/components/create-cinema-bottom-sheet/create-cinema-bottom-sheet.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CinemaUpdateComponent } from 'src/app/components/cinema-update/cinema-update.component';
import { CinemaDeleteConfirmDialogComponent } from 'src/app/components/cinema-delete-confirm-dialog/cinema-delete-confirm-dialog.component';

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
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog
  ) { }

  // variables for showing cinemas
  displayedColumns: string[] = ['name', 'createdAt', 'updatedAt', 'actions'];
  dataSource = new MatTableDataSource<Cinema>();

  ngOnInit(): void {
    this.getCinema();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getCinema() {
    this.activatedRoute.data.subscribe((response: any) => {
      this.dataSource.data = response.cinemas.data as Cinema[];
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
    let bottomSheetRef = this.bottomSheet.open(CreateCinemaBottomSheetComponent);
    bottomSheetRef.afterDismissed().subscribe((data) => {
      if (data == "create") {
        this.getCinema();
      }
    });
  }

}
