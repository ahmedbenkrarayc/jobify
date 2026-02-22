import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  @Input() searchTitle = '';
  @Input() searchLocation = '';

  @Output() searchTitleChange = new EventEmitter<string>();
  @Output() searchLocationChange = new EventEmitter<string>();

  onTitleChange(value: string): void {
    this.searchTitleChange.emit(value);
  }

  onLocationChange(value: string): void {
    this.searchLocationChange.emit(value);
  }
}
