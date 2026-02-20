import {createActionGroup, props} from '@ngrx/store';
import {RegisterUser} from '../../shared/models/registeruser';
import {SafeUser} from '../../shared/models/safeuser';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Register User': props<{ user: RegisterUser }>(),
    'Register User Success': props<{ user: SafeUser }>(),
    'Register User Failure': props<{ error: string }>(),

    'Load User By Email': props<{ email: string }>(),
  }
})
