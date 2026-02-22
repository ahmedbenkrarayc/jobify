import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Job } from '../../shared/models/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = 'https://www.arbeitnow.com/api/job-board-api';

  loadJobs(): Observable<Job[]> {
    return this.http.get<any>(this.API_URL).pipe(
      map(res => res.data ?? []),
      map((jobs: any[]) =>
        jobs.map(job => ({
          id: job.slug,
          title: job.title,
          company: job.company_name,
          description: job.description,
          link: job.url,
          location: job.location,
          salary: job.salary,
          date: new Date(job.created_at * 1000)
        } as Job))
      )
    );
  }
}
