import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Job } from '../../shared/models/job';

export const JobActions = createActionGroup({
  source: 'Jobs',
  events: {
    'Load Jobs': emptyProps(),

    'Load Jobs Success': props<{ jobs: Job[] }>(),

    'Load Jobs Failure': props<{ error: string }>(),

    'Update Search Filters': props<{
      title?: string;
      location?: string;
    }>(),

    'Change Page': props<{
      page: number;
    }>()
  }
});
