import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
  lastActive: string;
  isActive: boolean;
}

@Component({
  selector: 'app-user-list',
  standalone: true, // ✅ Needed for Vite/Angular 17+
  imports: [CommonModule], // ✅ To use *ngFor, *ngIf, etc.
  templateUrl: './user-list-component.html',
  styleUrls: ['./user-list-component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      role: 'Admin',
      lastActive: '2 hours ago',
      isActive: true
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      role: 'Editor',
      lastActive: '1 day ago',
      isActive: false
    },
    {
      id: 3,
      name: 'Robert Johnson',
      email: 'robert@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      role: 'Subscriber',
      lastActive: '3 days ago',
      isActive: false
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
      role: 'Editor',
      lastActive: '5 hours ago',
      isActive: true
    },
    {
      id: 5,
      name: 'Michael Wilson',
      email: 'michael@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
      role: 'Subscriber',
      lastActive: '1 week ago',
      isActive: false
    }
  ];

  loading: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  getRoleClass(role: string): string {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'role-admin';
      case 'editor':
        return 'role-editor';
      default:
        return 'role-subscriber';
    }
  }

  getRoleIcon(role: string): string {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'fas fa-crown';
      case 'editor':
        return 'fas fa-edit';
      default:
        return 'fas fa-user';
    }
  }
}
