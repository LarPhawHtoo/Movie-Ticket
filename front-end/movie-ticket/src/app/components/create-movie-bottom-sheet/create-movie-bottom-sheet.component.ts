import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MovieService } from 'src/app/services/movie.service';


@Component({
  selector: 'app-create-movie-bottom-sheet',
  templateUrl: './create-movie-bottom-sheet.component.html',
  styleUrls: ['./create-movie-bottom-sheet.component.scss']
})
export class CreateMovieBottomSheetComponent implements OnInit {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<CreateMovieBottomSheetComponent>,
    private MovieService: MovieService,
  ) { }

  name = new FormControl('', Validators.required);
  formData!: FormGroup;

  ngOnInit(): void {
    this.formData = new FormGroup({
      name: new FormControl('', Validators.required)
    });
  }

  onClickCreateMovie(data: any) {
    this.MovieService.createMovie(data.name).subscribe( res => {
      this.bottomSheetRef.dismiss("create");
      console.log(res);
    });
  }

  openLink(event: MouseEvent) {
    this.bottomSheetRef.dismiss();
    event.preventDefault()
  }

  getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }

    return this.name.hasError('email') ? 'Not a valid email' : '';
  }

}

