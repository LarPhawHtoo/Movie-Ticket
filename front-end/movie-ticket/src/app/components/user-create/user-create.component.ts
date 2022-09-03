import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MustMatch } from 'src/app/validators/must-match.validator';
import { MAT_DATE_FORMATS } from '@angular/material/core';

export const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'YYYY/MM/DD',
    monthYearLabel: 'MMMM YYYY',
    dateAllyLabel: 'LL',
    monthYearAllyLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT }
  ]
})
export class UserCreateComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UserCreateComponent>,
    private userService: UserService,
    public fb: FormBuilder,
  ) { }

  typeOption = [
    { enum: 'Admin' },
    { enum: 'User' }
  ];
  profileImage: any;
  imgFile: any;
  confirmView: Boolean = false;
  today = new Date();

  formData!: FormGroup;

  ngOnInit(): void {
    this.formData = this.fb.group({
      profile: new FormControl(''),
      fullName: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      dob: new FormControl(''),
      address: new FormControl(''),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPwd: new FormControl('', Validators.required)
    },
      {
      validator: MustMatch('password', 'confirmPwd')
    }
    );
  }

  public onClear() {
    if (this.confirmView == true) {
      this.formData.controls['profile'].enable();
      this.formData.controls['fullName'].enable();
      this.formData.controls['type'].enable();
      this.formData.controls['phone'].enable();
      this.formData.controls['email'].enable();
      this.formData.controls['dob'].enable();
      this.formData.controls['address'].enable();
      this.formData.controls['password'].enable();
      this.formData.controls['confirmPwd'].enable();
      this.confirmView = false;
    } else {
      this.formData.reset();
    }
  }

  onClickAddUser() {
    if (this.confirmView === true) {
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
        });
    }

    if (this.formData.valid) {
      this.formData.controls['profile'].disable();
      this.formData.controls['fullName'].disable();
      this.formData.controls['type'].disable();
      this.formData.controls['phone'].disable();
      this.formData.controls['email'].disable();
      this.formData.controls['dob'].disable();
      this.formData.controls['address'].disable();
      this.formData.controls['password'].disable();
      this.formData.controls['confirmPwd'].disable();
      this.confirmView = true;
    }
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

  get myForm() {
    return this.formData.controls;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.formData.controls[controlName].hasError(errorName);
  }

}
