import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { TrackApplication } from '../../shared/models/track-application';

export const TrackApplicationActions = createActionGroup({
  source: 'TrackApplications',
  events: {
    'Load Tracks': emptyProps(),

    'Load Tracks Success': props<{ tracks: TrackApplication[] }>(),

    'Load Tracks Failure': props<{ error: string }>(),

    'Toggle Track': props<{ track: Omit<TrackApplication, 'id'> }>(),

    'Add Track Success': props<{ track: TrackApplication }>(),

    'Add Track Failure': props<{ error: string }>(),

    'Remove Track': props<{ id: number }>(),

    'Remove Track Success': props<{ id: number }>(),

    'Remove Track Failure': props<{ error: string }>(),

    'Update Track Status': props<{ id: number; status: string }>(),

    'Update Track Status Success': props<{ track: TrackApplication }>(),

    'Update Track Status Failure': props<{ error: string }>(),

    'Update Track Notes': props<{ id: number; notes: string }>(),

    'Update Track Notes Success': props<{ track: TrackApplication }>(),

    'Update Track Notes Failure': props<{ error: string }>()
  }
});
