import {createFeatureSelector, createSelector} from "@ngrx/store";
import {UserState} from './user.state';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUserLoading = createSelector(selectUserState, state => state.loading);
export const selectUserError = createSelector(selectUserState, state => state.error);
export const selectUser = createSelector(selectUserState, state => state.user);

export const selectIsAuthenticated = createSelector(selectUserState, state => state.user !== null);

