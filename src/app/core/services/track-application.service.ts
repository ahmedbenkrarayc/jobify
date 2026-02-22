import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrackApplication } from '../../shared/models/track-application';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrackApplicationService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = `${environment.baseApiUrl}/trackApplications`;

  loadTracks(userId: number): Observable<TrackApplication[]> {
    return this.http.get<TrackApplication[]>(`${this.API_URL}?userId=${userId}`);
  }

  addTrack(track: Omit<TrackApplication, 'id'>): Observable<TrackApplication> {
    return this.http.post<TrackApplication>(this.API_URL, track);
  }

  removeTrack(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  updateTrackStatus(id: number, status: string): Observable<TrackApplication> {
    return this.http.patch<TrackApplication>(`${this.API_URL}/${id}`, { status });
  }

  updateTrackNotes(id: number, notes: string): Observable<TrackApplication> {
    return this.http.patch<TrackApplication>(`${this.API_URL}/${id}`, { notes });
  }
}
