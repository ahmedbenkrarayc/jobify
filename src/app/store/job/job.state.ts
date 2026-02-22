import { Job } from '../../shared/models/job';

export interface JobState {
  loading: boolean;
  jobs: Job[];
  error: string | null;
  currentPage: number;
  pageSize: number;
  searchTitle: string;
  searchLocation: string;
}

export const initialJobState: JobState = {
  loading: false,
  jobs: [],
  error: null,
  currentPage: 1,
  pageSize: 10,
  searchTitle: '',
  searchLocation: ''
};
