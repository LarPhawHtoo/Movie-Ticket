import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { CinemaResolverService } from './resolvers/cinema-resolver.service';
import { UsersComponent } from './pages/users/users.component';
import { UserResolverService } from './resolvers/user-resolver.service';
import { CinemasComponent } from './pages/cinemas/cinemas.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { MovieResolverService } from './resolvers/movie-resolver.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'logout', component: LogoutComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  { path: 'signup', component: SignupComponent },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard],
    resolve: { users: UserResolverService }
  },
  {
    path: 'cinemas',
    component: CinemasComponent,
    canActivate: [AuthGuard],
    resolve: { cinemas: CinemaResolverService }
  },
  {
    path: 'movies',
    component: MoviesComponent,
    canActivate: [AuthGuard],
    resolve: { movies: MovieResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
