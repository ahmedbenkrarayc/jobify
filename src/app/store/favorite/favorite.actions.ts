import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Favorite } from '../../shared/models/favorite';

export const FavoriteActions = createActionGroup({
  source: 'Favorites',
  events: {
    'Load Favorites': emptyProps(),

    'Load Favorites Success': props<{ favorites: Favorite[] }>(),

    'Load Favorites Failure': props<{ error: string }>(),

    'Toggle Favorite': props<{ favorite: Omit<Favorite, 'id'> }>(),

    'Add Favorite Success': props<{ favorite: Favorite }>(),

    'Add Favorite Failure': props<{ error: string }>(),

    'Remove Favorite Success': props<{ id: number }>(),

    'Remove Favorite Failure': props<{ error: string }>()
  }
});
