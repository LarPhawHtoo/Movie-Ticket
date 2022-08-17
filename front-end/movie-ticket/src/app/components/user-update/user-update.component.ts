import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<UserUpdateComponent>,
    private userService: UserService,
    private router: Router
  ) { }

  typeOption = [
    { enum: 'Admin' },
    { enum: 'User' }
  ];
  profileImage: any;
  imgFile: any;
  confirmView: Boolean = false;

  profile = new FormControl('', Validators.required);
  fullName = new FormControl('', Validators.required);
  type = new FormControl('', Validators.required);
  phone = new FormControl('', Validators.required);
  email = new FormControl('', [Validators.required, Validators.email]);
  dob = new FormControl('');
  address = new FormControl('');
  password = new FormControl('', Validators.required);

  formData!: FormGroup;

  ngOnInit(): void {
    this.formData = new FormGroup({
      profile: new FormControl(''),
      fullName: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      dob: new FormControl(''),
      address: new FormControl(''),
      password: new FormControl('', Validators.required)
    });
  }

  onClickUpdateUser() {
    const id = '123';

    const formData = new FormData();
    formData.append('profile', this.imgFile);
    formData.append('fullName', this.formData.controls['fullName'].value);
    formData.append('type', this.formData.controls['type'].value);
    formData.append('phone', this.formData.controls['phone'].value);
    formData.append('email', this.formData.controls['email'].value);
    formData.append('dob', this.formData.controls['dob'].value);
    formData.append('address', this.formData.controls['address'].value);
    formData.append('password', this.formData.controls['password'].value);

    this.userService.updateUser(id, formData)
      .subscribe(res => {
        this.dialogRef.close('create');
        this.router.navigate(['/users']);
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

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
