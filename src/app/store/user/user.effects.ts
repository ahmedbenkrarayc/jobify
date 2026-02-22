import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UserService} from '../../core/services/user.service';
import { UserActions } from './user.actions';
import {catchError, exhaustMap, map, of, switchMap, tap} from 'rxjs';
import {Router} from '@angular/router';

@Injectable()
export class UserEffects {
  private readonly actions$ = inject(Actions);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.registerUser),
      exhaustMap(({ user }) =>
        this.userService.loadByEmail(user.email).pipe(
          switchMap(usr => {
            if(usr !== null)
              return of(UserActions.registerUserFailure({ error: "This email already exists !" }));

            return this.userService.register(user).pipe(
              map(safeUser => UserActions.registerUserSuccess({ user: safeUser })),
              catchError(err => {
                console.error('Registration error:', err);
                return of(UserActions.registerUserFailure({ error: "Something went wrong. Please try again." }))
              })
            )
          })
        )
      )
    )
  );

  saveUserToSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.registerUserSuccess, UserActions.loginUserSuccess, UserActions.updateUserSuccess),
      tap(({ user }) => {
        sessionStorage.setItem('user', JSON.stringify(user))
      })
    ),
    { dispatch: false }
  );

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loginUser),
      exhaustMap(({ loginUser }) =>
        this.userService.loadByEmail(loginUser.email).pipe(
          map(user => {
            if(user === null)
              return UserActions.loginUserFailure({ error: "Email or password is wrong !" });

            if(user.password !== loginUser.password)
              return UserActions.loginUserFailure({ error: "Email or password is wrong !" });

            //here correct credentials
            const { password, ...rest } = user;
            return UserActions.loginUserSuccess({ user: rest });
          }),
          catchError(err => {
            console.error('Login error:', err);
            return of(UserActions.loginUserFailure({ error: "Something went wrong. Please try again." }))
          })
        )
      )
    )
  )

  redirectAfterLogin$ = createEffect(() =>
      this.actions$.pipe(
        ofType(UserActions.registerUserSuccess, UserActions.loginUserSuccess),
        tap(({ user }) => {
          void this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      exhaustMap(({ id, changes }) =>
        this.userService.updateUser(id, changes).pipe(
          map(user => UserActions.updateUserSuccess({ user })),
          catchError(err => {
            console.error('Update error:', err);
            return of(UserActions.updateUserFailure({ error: "Failed to update profile. Please try again." }))
          })
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      exhaustMap(({ id }) =>
        this.userService.deleteUser(id).pipe(
          map(() => UserActions.deleteUserSuccess()),
          catchError(err => {
            console.error('Delete error:', err);
            return of(UserActions.deleteUserFailure({ error: "Failed to delete account. Please try again." }))
          })
        )
      )
    )
  );

  clearSessionOnLogout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.logoutUser, UserActions.deleteUserSuccess),
      tap(() => {
        sessionStorage.removeItem('user');
        void this.router.navigate(['/login']);
      })
    ),
    { dispatch: false }
  );
}
