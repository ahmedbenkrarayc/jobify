import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TrackApplicationActions } from './track-application.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { TrackApplicationService } from '../../core/services/track-application.service';
import { SafeUser } from '../../shared/models/safeuser';

@Injectable()
export class TrackApplicationEffects {
  private actions$ = inject(Actions);
  private trackService = inject(TrackApplicationService);
  private store = inject(Store);

  private getUser(): SafeUser | null {
    const stored = sessionStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  }

  loadTracks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackApplicationActions.loadTracks),
      switchMap(() => {
        const user = this.getUser();
        if (!user) {
          return of(TrackApplicationActions.loadTracksFailure({ error: 'User not authenticated' }));
        }
        return this.trackService.loadTracks(user.id).pipe(
          map(tracks => TrackApplicationActions.loadTracksSuccess({ tracks })),
          catchError(() =>
            of(TrackApplicationActions.loadTracksFailure({
              error: 'Failed to load tracked applications. Please try again later!'
            }))
          )
        );
      })
    )
  );

  toggleTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackApplicationActions.toggleTrack),
      switchMap(({ track }) =>
        this.trackService.addTrack(track).pipe(
          map(newTrack => TrackApplicationActions.addTrackSuccess({ track: newTrack })),
          catchError(() =>
            of(TrackApplicationActions.addTrackFailure({
              error: 'Failed to add tracked application.'
            }))
          )
        )
      )
    )
  );

  removeTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackApplicationActions.removeTrack),
      switchMap(({ id }) =>
        this.trackService.removeTrack(id).pipe(
          map(() => TrackApplicationActions.removeTrackSuccess({ id })),
          catchError(() =>
            of(TrackApplicationActions.removeTrackFailure({
              error: 'Failed to remove tracked application.'
            }))
          )
        )
      )
    )
  );

  updateStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackApplicationActions.updateTrackStatus),
      switchMap(({ id, status }) =>
        this.trackService.updateTrackStatus(id, status).pipe(
          map(track => TrackApplicationActions.updateTrackStatusSuccess({ track })),
          catchError(() =>
            of(TrackApplicationActions.updateTrackStatusFailure({
              error: 'Failed to update status.'
            }))
          )
        )
      )
    )
  );

  updateNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackApplicationActions.updateTrackNotes),
      switchMap(({ id, notes }) =>
        this.trackService.updateTrackNotes(id, notes).pipe(
          map(track => TrackApplicationActions.updateTrackNotesSuccess({ track })),
          catchError(() =>
            of(TrackApplicationActions.updateTrackNotesFailure({
              error: 'Failed to update notes.'
            }))
          )
        )
      )
    )
  );
}
