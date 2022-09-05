import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
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
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT }
  ]
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
  profileImage: any = `http://localhost:8081/${this.data.profile}` || "";
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
  isProfile = localStorage.getItem("isProfile");

  formData!: FormGroup;

  ngOnInit(): void {
    this.profileImage = `http://localhost:8081/${this.data.profile}` || "";
    this.formData = new FormGroup({
      profile: new FormControl(''),
      fullName: new FormControl(this.data.fullName, Validators.required),
      type: new FormControl(this.data.type, Validators.required),
      phone: new FormControl(this.data.phone, Validators.required),
      email: new FormControl(this.data.email, [Validators.required, Validators.email]),
      dob: new FormControl(this.data.dob),
      address: new FormControl(this.data.address)
    });

  }

  onClickUpdateUser() {
    if (this.confirmView == true) {
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
          this.dialogRef.close('update');
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
      this.confirmView = true;
    }
  }

  public onClear() {
    if (this.confirmView === true) {
      this.formData.controls['profile'].enable();
      this.formData.controls['fullName'].enable();
      this.formData.controls['type'].enable();
      this.formData.controls['phone'].enable();
      this.formData.controls['email'].enable();
      this.formData.controls['dob'].enable();
      this.formData.controls['address'].enable();
      this.confirmView = false;
    } else {
      this.formData.reset();
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

  OnDateChange(event: any) {
    this.pickDate = event;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
