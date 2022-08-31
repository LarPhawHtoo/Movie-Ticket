import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MustMatch } from 'src/app/validators/must-match.validator';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {

  constructor(
    private userService: UserService,
    public fb: FormBuilder,
    private router: Router,
  ) { }

  confirmView: Boolean = false;
  loggedInUser = JSON.parse(localStorage.getItem('loginUser') || '');
  oldPassword = this.loggedInUser.password;
  today = new Date();
  formData!: FormGroup;

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('loginUser') || '');
    console.log(this.loggedInUser._id);
    this.formData = this.fb.group({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPwd: new FormControl('', Validators.required)
    },
    {
      validator: MustMatch('newPassword', 'confirmPwd')
    }
    )
  }

  get myForm() {
    return this.formData.controls;
  }

  onClickSave() {
    if (this.confirmView === true) {
      const id = this.loggedInUser._id;
      const formData = new FormData();
      formData.append('oldPassword', this.formData.controls['oldPassword'].value);
      formData.append('newPassword', this.formData.controls['newPassword'].value);
      formData.append('confirmPassword', this.formData.controls['confirmPwd'].value);
  
      this.userService.changePwd(id, formData)
        .subscribe(res => {
          this.router.navigate(['/logout']);
        });
    }

    if (this.formData.valid) {
      this.formData.controls['oldPassword'].disable();
      this.formData.controls['newPassword'].disable();
      this.formData.controls['confirmPwd'].disable();
      this.confirmView = true;
    }
  }

  public onClear() {
    if (this.confirmView === true) {
      this.formData.controls['oldPassword'].enable();
      this.formData.controls['newPassword'].enable();
      this.formData.controls['confirmPwd'].enable();
      this.confirmView = false;
    } else {
      this.formData.reset();
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.formData.controls[controlName].hasError(errorName);
  }

}
