import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
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
    @Inject(MAT_DIALOG_DATA) public data: UserDeleteConfirmDialogComponent,
  ) { }

  _id: string = '';

  ngOnInit(): void {
  }

  onClick(): void {
    this.dialogRef.close();
  }

  onDeleteClick(): void {
    const id = this.data._id;
    this.userService.deleteUser(id)
      .subscribe(() => {
        this.dialogRef.close('delete');
    })
  }

}
