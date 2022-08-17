import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { UserCreateComponent } from 'src/app/components/user-create/user-create.component';
import { UserActionsComponent } from 'src/app/components/user-actions/user-actions.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private activatedRoute: ActivatedRoute,
    private bottomSheet: MatBottomSheet,
    public dialog: MatDialog,
  ) { }

  displayedColumns: string[] = ['profile', 'name', 'type', 'phone', 'email', 'dob', 'address', 'createdAt', 'updatedAt', 'actions'];
  dataSource = new MatTableDataSource<User>();
  loggedInUser: any;
  

  ngOnInit(): void {
    this.getUser();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getUser() {
    this.activatedRoute.data.subscribe((response: any) => {
      this.dataSource.data = response.users.data as User[];
      console.log(this.dataSource.data)
    })
  }

  public doFilter = (target: any) => {
    this.dataSource.filter = target.value.trim().toLocaleLowerCase();
  }

  public redirectToUpdate = (id: string) => {
    
  }
  public redirectToDelete = (id: string) => {
    
  }

  openActionsDialog() {
    const dialogRef = this.dialog.open(UserActionsComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(UserCreateComponent, { width: '700px' });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }

}
