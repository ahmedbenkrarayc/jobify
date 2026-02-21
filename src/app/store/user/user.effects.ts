import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UserService} from '../../core/services/user.service';
import { UserActions } from './user.actions';
import {catchError, exhaustMap, map, of, switchMap, tap} from 'rxjs';

@Injectable()
export class UserEffects {
  private readonly actions$ = inject(Actions);
  private readonly userService = inject(UserService);

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
      ofType(UserActions.registerUserSuccess, UserActions.loginUserSuccess),
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
}
