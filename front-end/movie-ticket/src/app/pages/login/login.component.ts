import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email!: string;
  password!: string;
  formData!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.formData = new FormGroup({
      email: new FormControl(""),
      password: new FormControl(""),
    });
  }

  onClickLogin(data: any) {
    this.email = data.email;
    this.password = data.password;

    this.authService.login(this.email, this.password)
      .subscribe((data: any) => {
        localStorage.setItem("isUserLoggedIn", "true");
        localStorage.setItem("token", data.token);
        localStorage.setItem("loginUser", JSON.stringify(data.users));
        this.router.navigate(['/home']);
      })
  }

}
