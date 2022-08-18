import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-delete-confirm-dialog',
  templateUrl: './user-delete-confirm-dialog.component.html',
  styleUrls: ['./user-delete-confirm-dialog.component.scss']
})
export class UserDeleteConfirmDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<UserDeleteConfirmDialogComponent>,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  onClick(): void {
    this.dialogRef.close();
  }

  onDeleteClick(): void {
    this.dialogRef.close();
  }

}
