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
import { ProfileComponent } from './pages/profile/profile.component';
import { AboutComponent } from './pages/about/about.component';
import { PasswordChangeComponent } from './pages/password-change/password-change.component';
import { TicketsComponent } from './pages/tickets/tickets.component';
import { TicketResolverService } from './resolvers/ticket-resolver.service';

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
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'passwordchange',
    component: PasswordChangeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tickets',
    component: TicketsComponent,
    canActivate: [AuthGuard],
    resolve: { tickets: TicketResolverService }
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
