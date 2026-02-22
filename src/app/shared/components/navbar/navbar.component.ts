import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated, selectUser } from '../../../store/user/user.selectors';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private store = inject(Store);

  isAuthenticated$ = this.store.select(selectIsAuthenticated);
  user$ = this.store.select(selectUser);
  mobileMenuOpen = false;

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}
