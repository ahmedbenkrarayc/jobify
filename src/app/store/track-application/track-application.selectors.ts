import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TrackApplicationState } from './track-application.state';

export const selectTrackApplicationState =
  createFeatureSelector<TrackApplicationState>('trackApplications');

export const selectTracks = createSelector(
  selectTrackApplicationState,
  (state) => state.tracks
);

export const selectTrackLoading = createSelector(
  selectTrackApplicationState,
  (state) => state.loading
);

export const selectTrackError = createSelector(
  selectTrackApplicationState,
  (state) => state.error
);

export const selectTrackOfferIds = createSelector(
  selectTracks,
  (tracks) => tracks.map(t => t.offerId)
);

export const selectIsTracked = (offerId: string) =>
  createSelector(
    selectTracks,
    (tracks) => tracks.some(t => t.offerId === offerId)
  );
