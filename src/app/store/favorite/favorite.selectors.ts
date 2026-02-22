import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoriteState } from './favorite.state';

export const selectFavoriteState =
  createFeatureSelector<FavoriteState>('favorites');

export const selectFavorites = createSelector(
  selectFavoriteState,
  (state) => state.favorites
);

export const selectFavoriteLoading = createSelector(
  selectFavoriteState,
  (state) => state.loading
);

export const selectFavoriteError = createSelector(
  selectFavoriteState,
  (state) => state.error
);

export const selectFavoriteOfferIds = createSelector(
  selectFavorites,
  (favorites) => favorites.map(f => f.offerId)
);

export const selectIsFavorite = (offerId: string) =>
  createSelector(
    selectFavorites,
    (favorites) => favorites.some(f => f.offerId === offerId)
  );
