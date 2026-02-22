import { createReducer, on } from '@ngrx/store';
import { FavoriteActions } from './favorite.actions';
import { FavoriteState, initialFavoriteState } from './favorite.state';

export const favoriteReducer = createReducer(
  initialFavoriteState,

  on(FavoriteActions.loadFavorites, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(FavoriteActions.loadFavoritesSuccess, (state, { favorites }) => ({
    ...state,
    loading: false,
    favorites
  })),

  on(FavoriteActions.loadFavoritesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(FavoriteActions.addFavoriteSuccess, (state, { favorite }) => ({
    ...state,
    favorites: [...state.favorites, favorite]
  })),

  on(FavoriteActions.addFavoriteFailure, (state, { error }) => ({
    ...state,
    error
  })),

  on(FavoriteActions.removeFavoriteSuccess, (state, { id }) => ({
    ...state,
    favorites: state.favorites.filter(f => f.id !== id)
  })),

  on(FavoriteActions.removeFavoriteFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
