import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SignupComponent } from './pages/signup/signup.component';
import { SignupSuccessSnackBarComponent } from './components/signup-success-snack-bar/signup-success-snack-bar.component';
import { CreateCinemaBottomSheetComponent } from './components/create-cinema-bottom-sheet/create-cinema-bottom-sheet.component';
import { UsersComponent } from './pages/users/users.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { LogoutConfirmComponent } from './components/logout-confirm/logout-confirm.component';
import { CinemasComponent } from './pages/cinemas/cinemas.component';
import { CinemaUpdateComponent } from './components/cinema-update/cinema-update.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { UserDeleteConfirmDialogComponent } from './components/user-delete-confirm-dialog/user-delete-confirm-dialog.component';
import { CinemaDeleteConfirmDialogComponent } from './components/cinema-delete-confirm-dialog/cinema-delete-confirm-dialog.component';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { ProfileComponent } from './pages/profile/profile.component';
import { AboutComponent } from './pages/about/about.component';
import { PasswordChangeComponent } from './pages/password-change/password-change.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { CreateTicketDialogComponent } from './components/create-ticket-dialog/create-ticket-dialog.component';
import { UpdateTicketDialogComponent } from './components/update-ticket-dialog/update-ticket-dialog.component';
import { DeleteTicketConfirmDialogComponent } from './components/delete-ticket-confirm-dialog/delete-ticket-confirm-dialog.component';
import { MovieCreateComponent } from './components/movie-create/movie-create.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { MovieDeleteConfirmDialogComponent } from './components/movie-delete-confirm-dialog/movie-delete-confirm-dialog.component';
import { MovieUpdateComponent } from './components/movie-update/movie-update.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    HomeComponent,
    SignupComponent,
    SignupSuccessSnackBarComponent,
    CreateCinemaBottomSheetComponent,
    UsersComponent,
    UserCreateComponent,
    LogoutConfirmComponent,
    CinemasComponent,
    CinemaUpdateComponent,
    UserUpdateComponent,
    UserDeleteConfirmDialogComponent,
    CinemaDeleteConfirmDialogComponent,
    ProfileComponent,
    AboutComponent,
    PasswordChangeComponent,
    TicketsComponent,
    CreateTicketDialogComponent,
    UpdateTicketDialogComponent,
    DeleteTicketConfirmDialogComponent,
    MoviesComponent,
    MovieCreateComponent,
    MovieDeleteConfirmDialogComponent,
    MovieUpdateComponent,
    DashboardComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMatFileInputModule,
    MomentDateModule,
    MatSidenavModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
