import {inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {RegisterUser} from '../../shared/models/registeruser';
import {map, Observable} from 'rxjs';
import {SafeUser} from '../../shared/models/safeuser';
import {User} from '../../shared/models/user';
import {UpdateUser} from '../../shared/models/updateuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);
  private API_URL: string = environment.baseApiUrl+'/users';

  register(user: RegisterUser): Observable<SafeUser> {
    return this.http.post<User>(this.API_URL, user).pipe(
      map(res => ({
        id: res.id,
        fname: res.fname,
        lname: res.lname,
        email: res.email
      }))
    );
  }

  loadByEmail(email: string): Observable<User | null> {
    return this.http.get<User[]>(
      `${this.API_URL}?email=${encodeURIComponent(email)}`
    ).pipe(
      map(res => res.length > 0 ? {
          id: res[0].id,
          fname: res[0].fname,
          lname: res[0].lname,
          email: res[0].email,
          password: res[0].password
        } : null
      )
    );
  }

  updateUser(id: number, changes: UpdateUser): Observable<SafeUser> {
    return this.http.patch<User>(`${this.API_URL}/${id}`, changes).pipe(
      map(res => ({
        id: res.id,
        fname: res.fname,
        lname: res.lname,
        email: res.email
      }))
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
