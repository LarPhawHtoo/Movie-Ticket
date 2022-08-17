import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CinemaService } from 'src/app/services/cinema.service';

@Component({
  selector: 'app-cinema-update',
  templateUrl: './cinema-update.component.html',
  styleUrls: ['./cinema-update.component.scss']
})
export class CinemaUpdateComponent implements OnInit {

  constructor(private cinemaService: CinemaService) { }

  name = new FormControl('', Validators.required);
  updatedAt = new Date();
  formData!: FormGroup;

  ngOnInit(): void {
    this.formData = new FormGroup({
      name: new FormControl('', Validators.required),
      updatedAt: new FormControl('')
    });
  }

  onClickUpdate(cinema: any) {
    const cinemaId = cinema._id;
    const updatedAt = new Date();
    const formData = new FormData();
    formData.append('name', this.formData.controls['name'].value);
    formData.append('updatedAt', this.formData.controls['updatedAt'].value);
    this.cinemaService.updateCinema(cinemaId, formData)
  }

}
