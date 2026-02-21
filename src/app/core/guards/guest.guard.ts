import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectIsAuthenticated} from '../../store';
import {map, take, tap} from 'rxjs';

export const guestGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectIsAuthenticated).pipe(
    take(1),
    tap((isAuth) => {
      if(isAuth){
        void router.navigate(['/']);
      }
    }),
    map((isAuth) => !isAuth)
  );
};
