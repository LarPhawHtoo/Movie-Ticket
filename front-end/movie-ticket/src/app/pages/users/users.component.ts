import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { catchError, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UserCreateComponent } from 'src/app/components/user-create/user-create.component';
import { UserUpdateComponent } from 'src/app/components/user-update/user-update.component';
import { UserDeleteConfirmDialogComponent } from 'src/app/components/user-delete-confirm-dialog/user-delete-confirm-dialog.component';
import { UserService } from '../../services/user.service';


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
    private userService: UserService,
    public dialog: MatDialog,
  ) { }

  displayedColumns: string[] = ['profile', 'fullName', 'type', 'phone', 'email', 'dob', 'address', 'createdAt', 'updatedAt', 'actions'];
  dataSource = new MatTableDataSource<User>();
  loggedInUser: any;
  

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
      this.dataSource.data = response.users.data as User[];
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getUser() {
    this.userService.getUsers().pipe(
      catchError(error => {
        return of(error);
      })
    ).subscribe((response: any) => {
      this.dataSource.data = response.data as User[];
    })
  }

  public doFilter = (target: any) => {
    this.dataSource.filter = target.value.trim().toLocaleLowerCase();
  }

  openUpdateDialog(element: any) {
    const dialogRef = this.dialog.open(UserUpdateComponent, { data: element });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'update') this.getUser();
    })
  }
  openDeleteDialog(element: any) {
    const dialogRef = this.dialog.open(UserDeleteConfirmDialogComponent, { data: element });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'delete') this.getUser();
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(UserCreateComponent, { width: '700px' });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'create') this.getUser();
    })
  }

}
