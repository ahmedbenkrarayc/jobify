import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Job } from '../../../shared/models/job';
import { JobActions } from '../../../store/job/job.actions';
import {
  selectPaginatedJobs,
  selectLoading,
  selectError,
  selectCurrentPage,
  selectTotalPages,
  selectHasJobs,
  selectFilteredAndSortedJobs
} from '../../../store/job/job.selectors';
import { selectIsAuthenticated, selectUser } from '../../../store/user/user.selectors';
import { FavoriteActions } from '../../../store/favorite/favorite.actions';
import { selectFavoriteOfferIds } from '../../../store/favorite/favorite.selectors';
import { TrackApplicationActions } from '../../../store/track-application/track-application.actions';
import { selectTrackOfferIds } from '../../../store/track-application/track-application.selectors';
import { JobCardComponent } from '../../../shared/components/job-card/job-card.component';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, FormsModule, JobCardComponent, NavbarComponent, SearchBarComponent, PaginationComponent],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private subs = new Subscription();

  jobs$ = this.store.select(selectPaginatedJobs);
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);
  hasJobs$ = this.store.select(selectHasJobs);
  allFilteredJobs$ = this.store.select(selectFilteredAndSortedJobs);
  favoriteOfferIds$ = this.store.select(selectFavoriteOfferIds);
  trackOfferIds$ = this.store.select(selectTrackOfferIds);

  currentPage = 1;
  totalPages = 1;
  isAuthenticated = false;
  userId = 0;
  favoriteOfferIds: string[] = [];
  trackOfferIds: string[] = [];
  searchTitle = '';
  searchLocation = '';

  ngOnInit(): void {
    this.store.dispatch(JobActions.loadJobs());

    this.subs.add(
      this.store.select(selectCurrentPage).subscribe(p => this.currentPage = p)
    );
    this.subs.add(
      this.store.select(selectTotalPages).subscribe(p => this.totalPages = p)
    );
    this.subs.add(
      this.store.select(selectIsAuthenticated).subscribe(v => {
        this.isAuthenticated = v;
        if (v) {
          this.store.dispatch(FavoriteActions.loadFavorites());
          this.store.dispatch(TrackApplicationActions.loadTracks());
        }
      })
    );
    this.subs.add(
      this.store.select(selectUser).subscribe(u => this.userId = u?.id ?? 0)
    );
    this.subs.add(
      this.favoriteOfferIds$.subscribe(ids => this.favoriteOfferIds = ids)
    );
    this.subs.add(
      this.trackOfferIds$.subscribe(ids => this.trackOfferIds = ids)
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onSearchTitle(value: string): void {
    this.searchTitle = value;
    this.store.dispatch(JobActions.updateSearchFilters({ title: value }));
  }

  onSearchLocation(value: string): void {
    this.searchLocation = value;
    this.store.dispatch(JobActions.updateSearchFilters({ location: value }));
  }

  onPageChange(page: number): void {
    this.store.dispatch(JobActions.changePage({ page }));
  }

  viewJob(job: Job): void {
    window.open(job.link, '_blank');
  }

  isFavorite(job: Job): boolean {
    return this.favoriteOfferIds.includes(job.id ?? '');
  }

  toggleFavorite(job: Job): void {
    this.store.dispatch(FavoriteActions.toggleFavorite({
      favorite: {
        userId: this.userId,
        offerId: job.id ?? '',
        title: job.title,
        company: job.company,
        location: job.location,
        link: job.link
      }
    }));
  }

  isTracked(job: Job): boolean {
    return this.trackOfferIds.includes(job.id ?? '');
  }

  addToTrack(job: Job): void {
    this.store.dispatch(TrackApplicationActions.toggleTrack({
      track: {
        userId: this.userId,
        offerId: job.id ?? '',
        apiSource: 'arbeitnow',
        title: job.title,
        company: job.company,
        location: job.location,
        url: job.link,
        status: 'en_attente',
        notes: '',
        dateAdded: new Date().toISOString()
      }
    }));
  }
}
