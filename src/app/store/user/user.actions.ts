import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {RegisterUser} from '../../shared/models/registeruser';
import {SafeUser} from '../../shared/models/safeuser';
import {LoginUser} from '../../shared/models/loginuser';
import {UpdateUser} from '../../shared/models/updateuser';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Register User': props<{ user: RegisterUser }>(),
    'Register User Success': props<{ user: SafeUser }>(),
    'Register User Failure': props<{ error: string }>(),

    'Load User By Email': props<{ email: string }>(),

    'Login User': props<{ loginUser: LoginUser }>(),
    'Login User Success': props<{ user: SafeUser }>(),
    'Login User Failure': props<{ error: string }>(),

    'Update User': props<{ id: number; changes: UpdateUser }>(),
    'Update User Success': props<{ user: SafeUser }>(),
    'Update User Failure': props<{ error: string }>(),

    'Delete User': props<{ id: number }>(),
    'Delete User Success': emptyProps(),
    'Delete User Failure': props<{ error: string }>(),

    'Logout User': emptyProps(),
  }
})
