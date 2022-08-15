import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Cinema } from 'src/app/interfaces/cinema.model';
import { ActivatedRoute } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CreateCinemaBottomSheetComponent } from 'src/app/components/create-cinema-bottom-sheet/create-cinema-bottom-sheet.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private activatedRoute: ActivatedRoute,
    private bottomSheet: MatBottomSheet,
  ) { }

  // variables for showing cinemas
  displayedColumns: string[] = ['name'];
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

  openBottomSheet() {
    let bottomSheetRef = this.bottomSheet.open(CreateCinemaBottomSheetComponent);
    bottomSheetRef.afterDismissed().subscribe((data) => {
      if (data == "create") {
        this.getCinema();
      }
    });
  }

}
