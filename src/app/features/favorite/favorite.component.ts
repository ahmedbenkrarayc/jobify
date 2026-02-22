import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Favorite } from '../../shared/models/favorite';
import { FavoriteActions } from '../../store/favorite/favorite.actions';
import {
  selectFavorites,
  selectFavoriteLoading,
  selectFavoriteError
} from '../../store/favorite/favorite.selectors';
import { selectIsAuthenticated } from '../../store/user/user.selectors';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css'
})
export class FavoriteComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private router = inject(Router);
  private subs = new Subscription();

  favorites$ = this.store.select(selectFavorites);
  loading$ = this.store.select(selectFavoriteLoading);
  error$ = this.store.select(selectFavoriteError);

  isAuthenticated = false;

  ngOnInit(): void {
    this.subs.add(
      this.store.select(selectIsAuthenticated).subscribe(v => {
        this.isAuthenticated = v;
        if (!v) {
          this.router.navigate(['/login']);
        }
      })
    );
    this.store.dispatch(FavoriteActions.loadFavorites());
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  removeFavorite(favorite: Favorite): void {
    this.store.dispatch(FavoriteActions.toggleFavorite({
      favorite: {
        userId: favorite.userId,
        offerId: favorite.offerId,
        title: favorite.title,
        company: favorite.company,
        location: favorite.location,
        link: favorite.link
      }
    }));
  }

  viewPost(favorite: Favorite): void {
    if (favorite.link) {
      window.open(favorite.link, '_blank');
    }
  }
}
