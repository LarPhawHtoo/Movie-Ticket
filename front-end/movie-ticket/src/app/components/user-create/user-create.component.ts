import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UserCreateComponent>,
    private userService: UserService,
    private router: Router
  ) { }


  userTypes = ['admin', 'user'];
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

  onClickAddUser() {
    const formData = new FormData();
    formData.append('profile', this.imgFile);
    formData.append('fullName', this.formData.controls['fullName'].value);
    formData.append('type', this.formData.controls['type'].value);
    formData.append('phone', this.formData.controls['phone'].value);
    formData.append('email', this.formData.controls['email'].value);
    formData.append('dob', this.formData.controls['dob'].value);
    formData.append('address', this.formData.controls['address'].value);
    formData.append('password', this.formData.controls['password'].value);

    this.userService.addUser(formData)
      .subscribe(res => {
        this.dialogRef.close('create');
        this.router.navigate(['/users']);
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
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

}
