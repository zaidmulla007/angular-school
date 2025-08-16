import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UserListComponent } from './user-list-component/user-list-component';
import { NavigationComponent } from './navigation/navigation';
import { DashboardComponent } from './dashboard/dashboard';
import { StudentsComponent } from './students/students';
import { TeachersComponent } from './teachers/teachers';
import { CoursesComponent } from './courses/courses';
import { NotificationComponent } from './notification/notification';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, 
    UserListComponent,
    NavigationComponent,
    DashboardComponent,
    StudentsComponent,
    TeachersComponent,
    CoursesComponent,
    NotificationComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('EduManage - School Management System');
  currentView = 'dashboard'; // Default view

  constructor() {
    // Listen for navigation events from the navigation component
    if (typeof window !== 'undefined') {
      this.setupNavigationListener();
    }
  }

  setupNavigationListener() {
    // This would typically use a service or event emitter
    // For now, we'll handle it through window events
    if (typeof window !== 'undefined') {
      window.addEventListener('navigate', (event: any) => {
        this.currentView = event.detail.route;
      });
    }
  }
}
