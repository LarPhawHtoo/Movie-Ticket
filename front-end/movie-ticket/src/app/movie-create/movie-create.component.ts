//import { Component, OnInit } from '@angular/core';
//import { FormControl, FormGroup, Validators } from '@angular/forms';
//import { MovieService, MovieService } from 'src/app/services/movie.service';
//import { MatDialogRef } from '@angular/material/dialog';
//import { Router } from '@angular/router';
//
//@Component({
//  selector: 'app-user-create',
//  templateUrl: './movie-create.component.html',
//  styleUrls: ['./movie-create.component.scss']
//})
//export class MovieCreateComponent implements OnInit {
//
//  constructor(
//    public dialogRef: MatDialogRef<MovieCreateComponent>,
//    private movieService: MovieService,
//    private router: Router
//  ) { }
//
//  profileImage: any;
//  imgFile: any;
//  confirmView: Boolean = false;
//
//  //profile = new FormControl('', Validators.required);
//  movieid = new FormControl('', Validators.required);
//  code = new FormControl('', Validators.required);
//  phone = new FormControl('', Validators.required);
//  email = new FormControl('', [Validators.required, Validators.email]);
//  dob = new FormControl('');
//  address = new FormControl('');
//  password = new FormControl('', Validators.required);
//
//  formData!: FormGroup;
//
//  ngOnInit(): void {
//    this.formData = new FormGroup({
//      profile: new FormControl(''),
//      fullName: new FormControl('', Validators.required),
//      type: new FormControl('', Validators.required),
//      phone: new FormControl('', Validators.required),
//      email: new FormControl('', [Validators.required, Validators.email]),
//      dob: new FormControl(''),
//      address: new FormControl(''),
//      password: new FormControl('', Validators.required)
//    });
//  }
//
//  onClickAddUser() {
//    const formData = new FormData();
//    formData.append('profile', this.imgFile);
//    formData.append('fullName', this.formData.controls['fullName'].value);
//    formData.append('type', this.formData.controls['type'].value);
//    formData.append('phone', this.formData.controls['phone'].value);
//    formData.append('email', this.formData.controls['email'].value);
//    formData.append('dob', this.formData.controls['dob'].value);
//    formData.append('address', this.formData.controls['address'].value);
//    formData.append('password', this.formData.controls['password'].value);
//
//    this.movieService.createMovie(formData)
//      .subscribe(res => {
//        this.dialogRef.close('create');
//        this.router.navigate(['/movies']);
//      });
//  }
//
//  onNoClick(): void {
//    this.dialogRef.close();
//  }
//
//  imageUpload(event: any) {
//    if (event.target.files && event.target.files[0]) {
//      const file = event.target.files[0];
//
//      this.imgFile = file;
//      const reader = new FileReader();
//      reader.onload = e => this.profileImage = reader.result;
//      reader.readAsDataURL(file);
//    }
//  }
//
//  getErrorMessage() {
//    if (this.email.hasError('required')) {
//      return 'You must enter a value';
//    }
//
//    return this.email.hasError('email') ? 'Not a valid email' : '';
//  }
//
//}
//
