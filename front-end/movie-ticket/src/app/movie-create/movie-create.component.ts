import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MovieService } from 'src/app/services/movie.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.scss']
})
export class MovieCreateComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MovieCreateComponent>,
    private movieService: MovieService,
    private router: Router
  ) { }

  profileImage: any;
  imgFile: any;
  confirmView: Boolean = false;


  code = new FormControl('', Validators.required);
  name = new FormControl('', Validators.required);
  profile = new FormControl('');
  year = new FormControl('');
  rating = new FormControl('');
  time = new FormControl('', Validators.required);

  formData!: FormGroup;

  ngOnInit(): void {
    this.formData = new FormGroup({
      code: new FormControl('', [Validators.required]),   
      name: new FormControl('', Validators.required),
      profile: new FormControl(''),
      year: new FormControl(''),
      rating: new FormControl(''),
      time: new FormControl('', Validators.required)
    });
  }

  onClickAddMovie() {
    const formData = new FormData();

    formData.append('code', this.formData.controls['code'].value);
    formData.append('name', this.formData.controls['name'].value);
    formData.append('profile', this.imgFile);
    formData.append('year', this.formData.controls['year'].value);
    formData.append('rating', this.formData.controls['rating'].value);
    formData.append('time', this.formData.controls['time'].value);

    this.movieService.createMovie(formData)
      .subscribe(res => {
        this.dialogRef.close('create');
        this.router.navigate(['/movies']);
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

  getErrorMessage(formName: string) {
  if (formName === 'code') {
      this.code.hasError('code') ? 'Not a valid code' : '';
    } else if (formName === 'name') {
      this.name.hasError('name') ? 'Not a valid name' : '';
    } else {
      this.time.hasError('time') ? 'Not a valid time' : '';
    }
  }

}

