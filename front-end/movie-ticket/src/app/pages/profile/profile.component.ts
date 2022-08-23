import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from 'src/app/components/change-password-dialog/change-password-dialog.component';
import { UserUpdateComponent } from 'src/app/components/user-update/user-update.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  loggedInUser: any;
  profileImg: string = '';

  ngOnInit(): void {
    this.updateProfile();
  }

  updateProfile() {
    this.loggedInUser = JSON.parse(localStorage.getItem('loginUser') || '');
    this.profileImg = `http://localhost:8081/${this.loggedInUser.profile}` || "";
  }

  openChangePwdDialog() {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, { data: this.loggedInUser });
    dialogRef.afterClosed().subscribe(result => {
      
    })
  }

  openUpdateProfileDialog() {
    const dialogRef = this.dialog.open(UserUpdateComponent, { data: this.loggedInUser });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'update') {
        this.updateProfile();
      }
    })
  }


}
