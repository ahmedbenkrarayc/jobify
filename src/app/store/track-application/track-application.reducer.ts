import { createReducer, on } from '@ngrx/store';
import { TrackApplicationActions } from './track-application.actions';
import { TrackApplicationState, initialTrackApplicationState } from './track-application.state';

export const trackApplicationReducer = createReducer(
  initialTrackApplicationState,

  on(TrackApplicationActions.loadTracks, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(TrackApplicationActions.loadTracksSuccess, (state, { tracks }) => ({
    ...state,
    loading: false,
    tracks
  })),

  on(TrackApplicationActions.loadTracksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(TrackApplicationActions.addTrackSuccess, (state, { track }) => ({
    ...state,
    tracks: [...state.tracks, track]
  })),

  on(TrackApplicationActions.addTrackFailure, (state, { error }) => ({
    ...state,
    error
  })),

  on(TrackApplicationActions.removeTrackSuccess, (state, { id }) => ({
    ...state,
    tracks: state.tracks.filter(t => t.id !== id)
  })),

  on(TrackApplicationActions.removeTrackFailure, (state, { error }) => ({
    ...state,
    error
  })),

  on(TrackApplicationActions.updateTrackStatusSuccess, (state, { track }) => ({
    ...state,
    tracks: state.tracks.map(t => t.id === track.id ? track : t)
  })),

  on(TrackApplicationActions.updateTrackStatusFailure, (state, { error }) => ({
    ...state,
    error
  })),

  on(TrackApplicationActions.updateTrackNotesSuccess, (state, { track }) => ({
    ...state,
    tracks: state.tracks.map(t => t.id === track.id ? track : t)
  })),

  on(TrackApplicationActions.updateTrackNotesFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
