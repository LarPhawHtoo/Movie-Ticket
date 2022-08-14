import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignupSuccessSnackBarComponent } from 'src/app/components/signup-success-snack-bar/signup-success-snack-bar.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  fullName!: string;
  email!: string;
  password!: string;
  formData!: FormGroup;
  message!: string;
  durationInSeconds = 5;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.formData = new FormGroup({
      fullName: new FormControl(),
      email: new FormControl(),
      password: new FormControl()
    });
  }

  onClickSignup(data: any) {
    this.fullName = data.fullName;
    this.email = data.email;
    this.password = data.password;

    this.authService.signup(this.fullName, this.email, this.password)
      .subscribe((response: any) => {
        this.message = response.message;
        if (this.message == 'Created User Successfully!') {
          this.snackBar.openFromComponent(SignupSuccessSnackBarComponent, {
            duration: this.durationInSeconds * 1000,
          });
        }
      });
    
    this.router.navigate(['/login']);
  }

}
