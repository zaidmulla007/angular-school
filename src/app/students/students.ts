import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Student {
  id: number;
  studentId: string;
  name: string;
  avatar: string;
  class: string;
  age: number;
  phone: string;
  attendance: number;
  performance: number;
  status: 'active' | 'inactive' | 'suspended';
}

interface Filter {
  id: string;
  label: string;
}

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './students.html',
  styleUrl: './students.css'
})
export class StudentsComponent implements OnInit {
  students: Student[] = [
    {
      id: 1,
      studentId: 'STU001',
      name: 'Emma Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      class: 'Grade 10-A',
      age: 16,
      phone: '+1 234-567-8901',
      attendance: 95,
      performance: 5,
      status: 'active'
    },
    {
      id: 2,
      studentId: 'STU002',
      name: 'Michael Chen',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      class: 'Grade 10-B',
      age: 15,
      phone: '+1 234-567-8902',
      attendance: 88,
      performance: 4,
      status: 'active'
    },
    {
      id: 3,
      studentId: 'STU003',
      name: 'Sophia Williams',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      class: 'Grade 11-A',
      age: 17,
      phone: '+1 234-567-8903',
      attendance: 92,
      performance: 5,
      status: 'active'
    },
    {
      id: 4,
      studentId: 'STU004',
      name: 'James Brown',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
      class: 'Grade 9-C',
      age: 14,
      phone: '+1 234-567-8904',
      attendance: 78,
      performance: 3,
      status: 'inactive'
    },
    {
      id: 5,
      studentId: 'STU005',
      name: 'Isabella Davis',
      avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
      class: 'Grade 12-A',
      age: 18,
      phone: '+1 234-567-8905',
      attendance: 97,
      performance: 5,
      status: 'active'
    },
    {
      id: 6,
      studentId: 'STU006',
      name: 'Oliver Martinez',
      avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
      class: 'Grade 10-A',
      age: 16,
      phone: '+1 234-567-8906',
      attendance: 82,
      performance: 4,
      status: 'suspended'
    },
    {
      id: 7,
      studentId: 'STU007',
      name: 'Ava Wilson',
      avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
      class: 'Grade 11-B',
      age: 17,
      phone: '+1 234-567-8907',
      attendance: 91,
      performance: 4,
      status: 'active'
    },
    {
      id: 8,
      studentId: 'STU008',
      name: 'Liam Anderson',
      avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
      class: 'Grade 9-A',
      age: 15,
      phone: '+1 234-567-8908',
      attendance: 85,
      performance: 3,
      status: 'active'
    }
  ];

  classes: string[] = [
    'Grade 9-A', 'Grade 9-B', 'Grade 9-C',
    'Grade 10-A', 'Grade 10-B', 'Grade 10-C',
    'Grade 11-A', 'Grade 11-B', 'Grade 11-C',
    'Grade 12-A', 'Grade 12-B', 'Grade 12-C'
  ];

  viewMode: 'grid' | 'list' = 'grid';
  showAddStudent = false;
  showAdvancedFilters = false;
  openMenuId: number | null = null;

  searchQuery = '';
  selectedClass = '';
  selectedStatus = '';
  activeFilters: Filter[] = [];

  constructor() {}

  ngOnInit(): void {}

  toggleMenu(studentId: number) {
    this.openMenuId = this.openMenuId === studentId ? null : studentId;
  }

  removeFilter(filter: Filter) {
    this.activeFilters = this.activeFilters.filter(f => f.id !== filter.id);
  }

  sort(column: string) {
    // Implement sorting logic
    console.log('Sorting by:', column);
  }
}