import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Job } from '../../models/job';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.css'
})
export class JobCardComponent {
  @Input({ required: true }) job!: Job;
  @Input() isAuthenticated = false;
  @Input() isFavorite = false;
  @Input() isTracked = false;

  @Output() view = new EventEmitter<Job>();
  @Output() favorite = new EventEmitter<Job>();
  @Output() track = new EventEmitter<Job>();

  onView(): void {
    this.view.emit(this.job);
  }

  onFavorite(): void {
    this.favorite.emit(this.job);
  }

  onTrack(): void {
    this.track.emit(this.job);
  }
}
