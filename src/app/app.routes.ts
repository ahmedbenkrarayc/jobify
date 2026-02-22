import { Routes } from '@angular/router';
import {guestGuard} from './core/guards/guest.guard';
import {authGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'jobs',
    pathMatch: 'full'
  },
  {
    path: 'jobs',
    loadComponent: () =>
      import('./features/search/jobs/jobs.component')
        .then(c => c.JobsComponent)
  },
  {
    path: 'favorites',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/favorite/favorite.component')
        .then(c => c.FavoriteComponent)
  },
  {
    path: 'track',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/track-application/track-application.component')
        .then(c => c.TrackApplicationComponent)
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/profile/profile.component')
        .then(c => c.ProfileComponent)
  },
  {
    path: 'register',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./features/auth/register/register.component')
        .then(c => c.RegisterComponent)
  },
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./features/auth/login/login.component')
        .then(c => c.LoginComponent)
  }
];
