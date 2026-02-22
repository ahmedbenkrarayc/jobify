import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { JobActions } from './job.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import {JobService} from '../../core/services/job.service';

@Injectable()
export class JobEffects {
  private actions$ = inject(Actions);
  private jobService = inject(JobService);

  loadJobs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JobActions.loadJobs),
      switchMap(() =>
        this.jobService.loadJobs().pipe(
          map(jobs => JobActions.loadJobsSuccess({ jobs })),
          catchError(err =>{
            console.log("Error loading jobs: "+ err);
            return of(JobActions.loadJobsFailure({
              error: 'Something went wrong. Please try again later !'
            }))
          }
          )
        )
      )
    )
  );
}
