import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<UserUpdateComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: UserUpdateComponent,
  ) { }

  typeOption = [
    { enum: 'Admin' },
    { enum: 'User' }
  ];
  profileImage: any;
  imgFile: any;
  confirmView: Boolean = false;
  _id: string = '';
  pickDate: any;
  today = new Date();

  profile = new FormControl('', Validators.required);
  fullName = new FormControl('', Validators.required);
  type = new FormControl('', Validators.required);
  phone = new FormControl('', Validators.required);
  email = new FormControl('', [Validators.required, Validators.email]);
  dob = new FormControl('');
  address = new FormControl('');

  formData!: FormGroup;

  ngOnInit(): void {
    this.formData = new FormGroup({
      profile: new FormControl(this.data.profile),
      fullName: new FormControl(this.data.fullName, Validators.required),
      type: new FormControl(this.data.type, Validators.required),
      phone: new FormControl(this.data.phone, Validators.required),
      email: new FormControl(this.data.email, [Validators.required, Validators.email]),
      dob: new FormControl(this.data.dob),
      address: new FormControl(this.data.address)
    });

  }

  onClickUpdateUser() {
    const id = this.data._id;
    const formData = new FormData();
    formData.append('profile', this.imgFile);
    formData.append('fullName', this.formData.controls['fullName'].value);
    formData.append('type', this.formData.controls['type'].value);
    formData.append('phone', this.formData.controls['phone'].value);
    formData.append('email', this.formData.controls['email'].value);
    formData.append('dob', this.formData.controls['dob'].value);
    formData.append('address', this.formData.controls['address'].value);

    this.userService.updateUser(id, formData)
      .subscribe(res => {
        this.dialogRef.close('create');
      });
  }

  imageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      this.imgFile = file;
      const reader = new FileReader();
      reader.onload = e => this.profileImage = reader.result;
      reader.readAsDataURL(file);
    }
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  OnDateChange(event: any) {
    this.pickDate = event;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
