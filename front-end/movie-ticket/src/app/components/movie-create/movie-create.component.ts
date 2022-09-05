import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MovieService } from 'src/app/services/movie.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Cinema } from 'src/app/interfaces/cinema.model';
import { MatTableDataSource } from '@angular/material/table';
import { CinemaService } from 'src/app/services/cinema.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.scss']
})
export class MovieCreateComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MovieCreateComponent>,
    private movieService: MovieService,
    private cinemaService: CinemaService,
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
  statuses: string[] = ['Coming Soon', 'Now Showing'];

  cinemaDataSource = new MatTableDataSource<Cinema>;
  cinemas: Cinema[] = [];
  times: string[] = ['10:30AM', '1:00PM', '2:30PM', '3:00PM'];

  formData!: FormGroup;

  ngOnInit(): void {
    this.formData = new FormGroup({
      code: new FormControl('', [Validators.required]),   
      name: new FormControl('', Validators.required),
      poster: new FormControl(''),
      year: new FormControl(''),
      rating: new FormControl(''),
      time: new FormControl('', Validators.required),
      cinema: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required)
    });

    this.cinemaService.getCinemas().subscribe((response: any) => {
      this.cinemaDataSource.data = response.data as Cinema[];

      for (let i = 0; i < this.cinemaDataSource.data.length; i++) {
        this.cinemas.push(this.cinemaDataSource.data[i]);
      }
    });
  }

  onClickAddMovie() {
    const data = {
      code: this.formData.controls['code'].value,
      name: this.formData.controls['name'].value,
      image: this.imgFile,
      year: this.formData.controls['year'].value,
      rating: this.formData.controls['rating'].value,
      time: this.formData.controls['time'].value,
      cinema_id: this.formData.controls['cinema'].value,
      status: this.formData.controls['status'].value
    }

    this.movieService.createMovie(data)
      .subscribe(res => {
        this.dialogRef.close('create');
      });
  }

  get myForm() {
    return this.formData.controls;
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

}

