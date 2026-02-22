import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input({ required: true }) currentPage = 1;
  @Input({ required: true }) totalPages = 1;

  @Output() pageChange = new EventEmitter<number>();

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onPageChange(page: number): void {
    this.pageChange.emit(page);
  }

  isVisible(page: number): boolean {
    return page === 1 || page === this.totalPages ||
      (this.currentPage - 2 <= page && page <= this.currentPage + 2);
  }

  showEllipsisBefore(page: number): boolean {
    return page === 2 && this.currentPage > 4;
  }

  showEllipsisAfter(page: number): boolean {
    return page === this.totalPages - 1 && this.currentPage < this.totalPages - 3;
  }
}
