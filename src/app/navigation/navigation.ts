import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css'
})
export class NavigationComponent {
  isCollapsed = false;
  activeRoute = 'dashboard';
  isMobileMenuOpen = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  setActive(route: string) {
    this.activeRoute = route;
    // Emit navigation event
    window.dispatchEvent(new CustomEvent('navigate', { 
      detail: { route: route } 
    }));
  }
}
