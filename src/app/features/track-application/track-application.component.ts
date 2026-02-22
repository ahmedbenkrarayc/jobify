import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription, map } from 'rxjs';
import { TrackApplication } from '../../shared/models/track-application';
import { TrackApplicationActions } from '../../store/track-application/track-application.actions';
import {
  selectTracks,
  selectTrackLoading,
  selectTrackError
} from '../../store/track-application/track-application.selectors';
import { selectIsAuthenticated } from '../../store/user/user.selectors';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-track-application',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './track-application.component.html',
  styleUrl: './track-application.component.css'
})
export class TrackApplicationComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private router = inject(Router);
  private subs = new Subscription();

  tracks$ = this.store.select(selectTracks);
  loading$ = this.store.select(selectTrackLoading);
  error$ = this.store.select(selectTrackError);

  statuses = ['en_attente', 'accepted', 'rejected', 'interview'];
  filterStatus = 'all';
  editingNotesId: number | null = null;
  editingNotesValue = '';

  filteredTracks$ = this.tracks$.pipe(
    map(tracks =>
      this.filterStatus === 'all'
        ? tracks
        : tracks.filter(t => t.status === this.filterStatus)
    )
  );

  ngOnInit(): void {
    this.subs.add(
      this.store.select(selectIsAuthenticated).subscribe(v => {
        if (!v) {
          this.router.navigate(['/login']);
        }
      })
    );
    this.store.dispatch(TrackApplicationActions.loadTracks());
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onFilterChange(status: string): void {
    this.filterStatus = status;
    this.filteredTracks$ = this.tracks$.pipe(
      map(tracks =>
        status === 'all'
          ? tracks
          : tracks.filter(t => t.status === status)
      )
    );
  }

  removeTrack(track: TrackApplication): void {
    this.store.dispatch(TrackApplicationActions.removeTrack({ id: track.id }));
  }

  onStatusChange(track: TrackApplication, status: string): void {
    this.store.dispatch(TrackApplicationActions.updateTrackStatus({ id: track.id, status }));
  }

  startEditNotes(track: TrackApplication): void {
    this.editingNotesId = track.id;
    this.editingNotesValue = track.notes;
  }

  saveNotes(track: TrackApplication): void {
    this.store.dispatch(TrackApplicationActions.updateTrackNotes({ id: track.id, notes: this.editingNotesValue }));
    this.editingNotesId = null;
    this.editingNotesValue = '';
  }

  cancelEditNotes(): void {
    this.editingNotesId = null;
    this.editingNotesValue = '';
  }

  viewPost(track: TrackApplication): void {
    if (track.url) {
      window.open(track.url, '_blank');
    }
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'en_attente': 'Pending',
      'accepted': 'Accepted',
      'rejected': 'Rejected',
      'interview': 'Interview'
    };
    return labels[status] ?? status;
  }
}
