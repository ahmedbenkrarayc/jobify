import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { UserReducer, UserEffects } from './store';
import { jobReducer, JobEffects } from './store/job';
import { favoriteReducer, FavoriteEffects } from './store/favorite';
import { trackApplicationReducer, TrackApplicationEffects } from './store/track-application';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ user: UserReducer, jobs: jobReducer, favorites: favoriteReducer, trackApplications: trackApplicationReducer }),
    provideEffects([UserEffects, JobEffects, FavoriteEffects, TrackApplicationEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideHttpClient()
  ]
};
