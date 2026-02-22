import { createFeatureSelector, createSelector } from '@ngrx/store';
import { JobState } from './job.state';

export const selectJobState =
  createFeatureSelector<JobState>('jobs');

export const selectJobs = createSelector(
  selectJobState,
  (state) => state.jobs
);

export const selectLoading = createSelector(
  selectJobState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectJobState,
  (state) => state.error
);

export const selectCurrentPage = createSelector(
  selectJobState,
  (state) => state.currentPage
);

export const selectPageSize = createSelector(
  selectJobState,
  (state) => state.pageSize
);

export const selectSearchTitle = createSelector(
  selectJobState,
  (state) => state.searchTitle
);

export const selectSearchLocation = createSelector(
  selectJobState,
  (state) => state.searchLocation
);

export const selectFilteredAndSortedJobs = createSelector(
  selectJobs,
  selectSearchTitle,
  selectSearchLocation,
  (jobs, title, location) => {
    const filtered = jobs.filter(job => {
      const matchesTitle = title
        ? job.title.toLowerCase().includes(title.toLowerCase())
        : true;

      const matchesLocation = location
        ? job.location.toLowerCase().includes(location.toLowerCase())
        : true;

      return matchesTitle && matchesLocation;
    });

    return [...filtered].sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    );
  }
);

export const selectTotalPages = createSelector(
  selectFilteredAndSortedJobs,
  selectPageSize,
  (jobs, pageSize) =>
    Math.ceil(jobs.length / pageSize)
);

export const selectPaginatedJobs = createSelector(
  selectFilteredAndSortedJobs,
  selectCurrentPage,
  selectPageSize,
  (jobs, currentPage, pageSize) => {
    const start = (currentPage - 1) * pageSize;
    return jobs.slice(start, start + pageSize);
  }
);

export const selectHasJobs = createSelector(
  selectFilteredAndSortedJobs,
  (jobs) => jobs.length > 0
);
