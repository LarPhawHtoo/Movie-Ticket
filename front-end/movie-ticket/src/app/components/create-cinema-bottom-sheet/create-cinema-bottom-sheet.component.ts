import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CinemaService } from 'src/app/services/cinema.service';

@Component({
  selector: 'app-create-cinema-bottom-sheet',
  templateUrl: './create-cinema-bottom-sheet.component.html',
  styleUrls: ['./create-cinema-bottom-sheet.component.scss']
})
export class CreateCinemaBottomSheetComponent implements OnInit {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<CreateCinemaBottomSheetComponent>,
    private cinemaService: CinemaService,
  ) { }

  name!: string;
  formData!: FormGroup;

  ngOnInit(): void {
    this.formData = new FormGroup({
      name: new FormControl("")
    });
  }

  onClickCreateCinema(data: any) {
    this.name = data.name;

    this.cinemaService.createCinema(this.name).subscribe((data) => {
      this.bottomSheetRef.dismiss("create");
      console.log(data);
    });
  }

  openLink(event: MouseEvent) {
    this.bottomSheetRef.dismiss();
    event.preventDefault()
  }

}
