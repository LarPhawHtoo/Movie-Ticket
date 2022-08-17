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
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { UsersComponent } from './pages/users/users.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { LogoutConfirmComponent } from './components/logout-confirm/logout-confirm.component';
import { UserActionsComponent } from './components/user-actions/user-actions.component';
import { CinemasComponent } from './pages/cinemas/cinemas.component';
import { DeleteConfirmComponent } from './components/delete-confirm/delete-confirm.component';
import { CinemaUpdateComponent } from './components/cinema-update/cinema-update.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';

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
    UserActionsComponent,
    CinemasComponent,
    DeleteConfirmComponent,
    CinemaUpdateComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
