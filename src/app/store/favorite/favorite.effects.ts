import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { FavoriteActions } from './favorite.actions';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { FavoriteService } from '../../core/services/favorite.service';
import { selectUser } from '../user/user.selectors';
import { selectFavorites } from './favorite.selectors';

@Injectable()
export class FavoriteEffects {
  private actions$ = inject(Actions);
  private favoriteService = inject(FavoriteService);
  private store = inject(Store);

  loadFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoriteActions.loadFavorites),
      withLatestFrom(this.store.select(selectUser)),
      switchMap(([, user]) => {
        if (!user) {
          return of(FavoriteActions.loadFavoritesFailure({ error: 'User not authenticated' }));
        }
        return this.favoriteService.loadFavorites(user.id).pipe(
          map(favorites => FavoriteActions.loadFavoritesSuccess({ favorites })),
          catchError(err => {
            console.log('Error loading favorites: ' + err);
            return of(FavoriteActions.loadFavoritesFailure({
              error: 'Failed to load favorites. Please try again later!'
            }));
          })
        );
      })
    )
  );

  toggleFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoriteActions.toggleFavorite),
      withLatestFrom(this.store.select(selectFavorites)),
      switchMap(([{ favorite }, favorites]) => {
        const existing = favorites.find(f => f.offerId === favorite.offerId);
        if (existing) {
          return this.favoriteService.removeFavorite(existing.id).pipe(
            map(() => FavoriteActions.removeFavoriteSuccess({ id: existing.id })),
            catchError(err => {
              console.log('Error removing favorite: ' + err);
              return of(FavoriteActions.removeFavoriteFailure({
                error: 'Failed to remove favorite.'
              }));
            })
          );
        } else {
          return this.favoriteService.addFavorite(favorite).pipe(
            map(newFav => FavoriteActions.addFavoriteSuccess({ favorite: newFav })),
            catchError(err => {
              console.log('Error adding favorite: ' + err);
              return of(FavoriteActions.addFavoriteFailure({
                error: 'Failed to add favorite.'
              }));
            })
          );
        }
      })
    )
  );
}
