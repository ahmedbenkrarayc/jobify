import { SafeUser } from '../../shared/models/safeuser';

export interface UserState {
  loading: boolean;
  error: string | null;
  user: SafeUser | null;
}

const storedUser = sessionStorage.getItem('user');

export const initialUserState: UserState = {
  loading: false,
  error: null,
  user: storedUser ? JSON.parse(storedUser) : null
};
