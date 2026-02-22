import { TrackApplication } from '../../shared/models/track-application';

export interface TrackApplicationState {
  loading: boolean;
  tracks: TrackApplication[];
  error: string | null;
}

export const initialTrackApplicationState: TrackApplicationState = {
  loading: false,
  tracks: [],
  error: null
};
