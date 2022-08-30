import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:front-end/movie-ticket/src/app/pages/about/about.component.spec.ts
import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
========
import { MovieCreateComponent } from './movie-create.component';

describe('MovieCreateComponent', () => {
  let component: MovieCreateComponent;
  let fixture: ComponentFixture<MovieCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieCreateComponent);
>>>>>>>> test:front-end/movie-ticket/src/app/movie-create/movie-create.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
