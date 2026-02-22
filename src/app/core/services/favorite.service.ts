import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Favorite } from '../../shared/models/favorite';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = `${environment.baseApiUrl}/favorites`;

  loadFavorites(userId: number): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(`${this.API_URL}?userId=${userId}`);
  }

  addFavorite(favorite: Omit<Favorite, 'id'>): Observable<Favorite> {
    return this.http.post<Favorite>(this.API_URL, favorite);
  }

  removeFavorite(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
