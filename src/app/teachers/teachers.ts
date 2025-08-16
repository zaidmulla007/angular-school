import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../services/notification.service';

interface Teacher {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  department: string;
  experience: number;
  qualification: string;
  joinDate: string;
  status: 'active' | 'inactive';
  avatar?: string;
}

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teachers.html',
  styleUrls: ['./teachers.css']
})
export class TeachersComponent {
  teachers = signal<Teacher[]>([
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@school.edu',
      phone: '+1 234-567-8901',
      subject: 'Mathematics',
      department: 'Science',
      experience: 12,
      qualification: 'Ph.D. in Mathematics',
      joinDate: '2012-08-15',
      status: 'active',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=5e72e4&color=fff'
    },
    {
      id: 2,
      name: 'Prof. Michael Chen',
      email: 'michael.chen@school.edu',
      phone: '+1 234-567-8902',
      subject: 'Physics',
      department: 'Science',
      experience: 15,
      qualification: 'M.Sc. Physics',
      joinDate: '2009-09-01',
      status: 'active',
      avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=2dce89&color=fff'
    }
  ]);

  showModal = false;
  modalMode: 'add' | 'edit' = 'add';
  searchTerm = '';
  filterDepartment = '';
  
  currentTeacher: Teacher = this.getEmptyTeacher();
  
  departments = ['Science', 'Arts', 'Commerce', 'Computer Science', 'Languages'];
  subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Geography', 'Computer Science', 'Economics'];

  constructor(private notificationService: NotificationService) {}

  get filteredTeachers() {
    return this.teachers().filter(teacher => {
      const matchesSearch = teacher.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                          teacher.subject.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                          teacher.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesDepartment = !this.filterDepartment || teacher.department === this.filterDepartment;
      return matchesSearch && matchesDepartment;
    });
  }

  get totalTeachers() {
    return this.teachers().length;
  }

  get activeTeachers() {
    return this.teachers().filter(t => t.status === 'active').length;
  }

  getEmptyTeacher(): Teacher {
    return {
      id: 0,
      name: '',
      email: '',
      phone: '',
      subject: '',
      department: '',
      experience: 0,
      qualification: '',
      joinDate: new Date().toISOString().split('T')[0],
      status: 'active'
    };
  }

  openAddModal() {
    this.modalMode = 'add';
    this.currentTeacher = this.getEmptyTeacher();
    this.showModal = true;
  }

  openEditModal(teacher: Teacher) {
    this.modalMode = 'edit';
    this.currentTeacher = { ...teacher };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.currentTeacher = this.getEmptyTeacher();
  }

  saveTeacher() {
    if (!this.validateTeacher()) {
      return;
    }

    if (this.modalMode === 'add') {
      const newTeacher = {
        ...this.currentTeacher,
        id: Math.max(...this.teachers().map(t => t.id), 0) + 1,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(this.currentTeacher.name)}&background=${this.getRandomColor()}&color=fff`
      };
      this.teachers.update(teachers => [...teachers, newTeacher]);
      this.notificationService.success('Teacher added successfully!');
    } else {
      this.teachers.update(teachers =>
        teachers.map(t => t.id === this.currentTeacher.id ? this.currentTeacher : t)
      );
      this.notificationService.success('Teacher updated successfully!');
    }
    
    this.closeModal();
  }

  deleteTeacher(id: number) {
    if (confirm('Are you sure you want to delete this teacher?')) {
      this.teachers.update(teachers => teachers.filter(t => t.id !== id));
      this.notificationService.warning('Teacher deleted successfully!');
    }
  }

  toggleStatus(teacher: Teacher) {
    teacher.status = teacher.status === 'active' ? 'inactive' : 'active';
    this.teachers.update(teachers =>
      teachers.map(t => t.id === teacher.id ? teacher : t)
    );
    this.notificationService.info(`Teacher status changed to ${teacher.status}`);
  }

  validateTeacher(): boolean {
    if (!this.currentTeacher.name || !this.currentTeacher.email || !this.currentTeacher.subject) {
      this.notificationService.error('Please fill in all required fields');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.currentTeacher.email)) {
      this.notificationService.error('Please enter a valid email address');
      return false;
    }
    
    return true;
  }

  getRandomColor(): string {
    const colors = ['5e72e4', '2dce89', 'fb6340', '11cdef', 'f5365c'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  exportTeachers() {
    const csv = this.convertToCSV(this.teachers());
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'teachers.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    this.notificationService.success('Teachers data exported successfully!');
  }

  convertToCSV(data: Teacher[]): string {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Subject', 'Department', 'Experience', 'Qualification', 'Join Date', 'Status'];
    const rows = data.map(t => [
      t.id,
      t.name,
      t.email,
      t.phone,
      t.subject,
      t.department,
      t.experience,
      t.qualification,
      t.joinDate,
      t.status
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }
}