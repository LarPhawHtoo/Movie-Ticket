import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { HomeComponent } from './pages/home/home.component';
import { FetchUserResolverService } from './resolvers/fetch-user-resolver.service';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    resolve: { users: FetchUserResolverService }
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'logout', component: LogoutComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
