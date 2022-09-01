import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserUpdateComponent } from 'src/app/components/user-update/user-update.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private router: Router
  ) { }

  loggedInUser: any;
  profileImg: string = '';

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('loginUser') || '');
    this.profileImg = `http://localhost:8081/${this.loggedInUser.profile}` || "";
  }

  openUpdateProfileDialog() {
    const dialogRef = this.dialog.open(UserUpdateComponent, { data: this.loggedInUser });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'update') this.router.navigate(['/logout']);
    })
  }


}
