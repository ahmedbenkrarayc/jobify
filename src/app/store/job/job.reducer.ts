import { createReducer, on } from '@ngrx/store';
import { JobActions } from './job.actions';
import { JobState, initialJobState } from './job.state';

export const jobReducer = createReducer(
  initialJobState,

  on(JobActions.loadJobs, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(JobActions.loadJobsSuccess, (state, { jobs }) => ({
    ...state,
    loading: false,
    jobs,
    currentPage: 1
  })),

  on(JobActions.loadJobsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(JobActions.updateSearchFilters, (state, { title, location }) => ({
    ...state,
    searchTitle: title ?? state.searchTitle,
    searchLocation: location ?? state.searchLocation,
    currentPage: 1
  })),

  on(JobActions.changePage, (state, { page }) => ({
    ...state,
    currentPage: page
  }))
);
