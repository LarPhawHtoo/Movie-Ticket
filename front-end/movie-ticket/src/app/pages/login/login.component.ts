import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

import { User } from 'src/app/interfaces/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName!: string;
  password!: string;
  formData!: FormGroup;

  users: User[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
      console.log(response.users);
      this.users = response.users;
    });

    this.formData = new FormGroup({
      userName: new FormControl("admin"),
      password: new FormControl("admin"),
    });
  }

  onClickLogin(data: any) {
    this.userName = data.userName;
    this.password = data.password;

    this.authService.login(this.userName, this.password)
      .subscribe(data => {
        if (data) this.router.navigate(['/home']);
      })
  }

}
