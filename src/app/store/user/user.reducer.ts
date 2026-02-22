import {createReducer, on} from '@ngrx/store';
import { initialUserState } from './user.state';
import {UserActions} from './user.actions';

export const UserReducer = createReducer(
  initialUserState,
  on(UserActions.registerUser, state => ({ ...state, loading: true, error: null })),
  on(UserActions.registerUserSuccess, (state, {user}) => ({ ...state, loading: false, user })),
  on(UserActions.registerUserFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(UserActions.loginUser, state => ({ ...state, loading: true, error: null })),
  on(UserActions.loginUserSuccess, (state, {user}) => ({ ...state, loading: false, user })),
  on(UserActions.loginUserFailure, (state, {error}) => ({ ...state, loading: false, error })),

  on(UserActions.updateUser, state => ({ ...state, loading: true, error: null })),
  on(UserActions.updateUserSuccess, (state, {user}) => ({ ...state, loading: false, user })),
  on(UserActions.updateUserFailure, (state, {error}) => ({ ...state, loading: false, error })),

  on(UserActions.deleteUser, state => ({ ...state, loading: true, error: null })),
  on(UserActions.deleteUserSuccess, () => ({ loading: false, error: null, user: null })),
  on(UserActions.deleteUserFailure, (state, {error}) => ({ ...state, loading: false, error })),

  on(UserActions.logoutUser, () => ({ loading: false, error: null, user: null }))
)
