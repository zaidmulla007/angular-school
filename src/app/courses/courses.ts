import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../services/notification.service';

interface Course {
  id: number;
  code: string;
  name: string;
  description: string;
  instructor: string;
  department: string;
  credits: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  enrolledStudents: number;
  maxStudents: number;
  schedule: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'upcoming' | 'completed';
  thumbnail?: string;
}

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.html',
  styleUrls: ['./courses.css']
})
export class CoursesComponent {
  courses = signal<Course[]>([
    {
      id: 1,
      code: 'MATH101',
      name: 'Introduction to Calculus',
      description: 'Fundamental concepts of calculus including limits, derivatives, and integrals.',
      instructor: 'Dr. Sarah Johnson',
      department: 'Mathematics',
      credits: 4,
      duration: '16 weeks',
      level: 'Beginner',
      enrolledStudents: 45,
      maxStudents: 50,
      schedule: 'Mon, Wed, Fri - 10:00 AM',
      startDate: '2024-01-15',
      endDate: '2024-05-15',
      status: 'active',
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop'
    },
    {
      id: 2,
      code: 'CS201',
      name: 'Data Structures & Algorithms',
      description: 'In-depth study of data structures, algorithms, and their applications.',
      instructor: 'Prof. Michael Chen',
      department: 'Computer Science',
      credits: 3,
      duration: '16 weeks',
      level: 'Intermediate',
      enrolledStudents: 38,
      maxStudents: 40,
      schedule: 'Tue, Thu - 2:00 PM',
      startDate: '2024-01-15',
      endDate: '2024-05-15',
      status: 'active',
      thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=250&fit=crop'
    },
    {
      id: 3,
      code: 'PHY301',
      name: 'Quantum Mechanics',
      description: 'Advanced physics course covering quantum theory and applications.',
      instructor: 'Dr. Emily Watson',
      department: 'Physics',
      credits: 4,
      duration: '16 weeks',
      level: 'Advanced',
      enrolledStudents: 22,
      maxStudents: 30,
      schedule: 'Mon, Wed - 3:00 PM',
      startDate: '2024-06-01',
      endDate: '2024-09-30',
      status: 'upcoming',
      thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=250&fit=crop'
    }
  ]);

  showModal = false;
  modalMode: 'add' | 'edit' | 'view' = 'add';
  searchTerm = '';
  filterDepartment = '';
  filterStatus = '';
  filterLevel = '';
  
  currentCourse: Course = this.getEmptyCourse();
  
  departments = ['Mathematics', 'Computer Science', 'Physics', 'Chemistry', 'Biology', 'English', 'History'];
  levels: Array<'Beginner' | 'Intermediate' | 'Advanced'> = ['Beginner', 'Intermediate', 'Advanced'];
  statuses: Array<'active' | 'upcoming' | 'completed'> = ['active', 'upcoming', 'completed'];

  constructor(private notificationService: NotificationService) {}

  get filteredCourses() {
    return this.courses().filter(course => {
      const matchesSearch = course.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                          course.code.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                          course.instructor.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesDepartment = !this.filterDepartment || course.department === this.filterDepartment;
      const matchesStatus = !this.filterStatus || course.status === this.filterStatus;
      const matchesLevel = !this.filterLevel || course.level === this.filterLevel;
      return matchesSearch && matchesDepartment && matchesStatus && matchesLevel;
    });
  }

  get activeCourses() {
    return this.courses().filter(c => c.status === 'active').length;
  }

  get totalEnrollments() {
    return this.courses().reduce((sum, c) => sum + c.enrolledStudents, 0);
  }

  get averageCapacity() {
    const courses = this.courses();
    if (courses.length === 0) return 0;
    const totalCapacity = courses.reduce((sum, c) => sum + (c.enrolledStudents / c.maxStudents) * 100, 0);
    return Math.round(totalCapacity / courses.length);
  }

  getEmptyCourse(): Course {
    return {
      id: 0,
      code: '',
      name: '',
      description: '',
      instructor: '',
      department: '',
      credits: 3,
      duration: '16 weeks',
      level: 'Beginner',
      enrolledStudents: 0,
      maxStudents: 30,
      schedule: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      status: 'upcoming',
      thumbnail: ''
    };
  }

  openAddModal() {
    this.modalMode = 'add';
    this.currentCourse = this.getEmptyCourse();
    this.showModal = true;
  }

  openEditModal(course: Course) {
    this.modalMode = 'edit';
    this.currentCourse = { ...course };
    this.showModal = true;
  }

  openViewModal(course: Course) {
    this.modalMode = 'view';
    this.currentCourse = { ...course };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.currentCourse = this.getEmptyCourse();
  }

  saveCourse() {
    if (!this.validateCourse()) {
      return;
    }

    if (this.modalMode === 'add') {
      const newCourse = {
        ...this.currentCourse,
        id: Math.max(...this.courses().map(c => c.id), 0) + 1,
        thumbnail: this.currentCourse.thumbnail || this.getDefaultThumbnail()
      };
      this.courses.update(courses => [...courses, newCourse]);
      this.notificationService.success('Course added successfully!');
    } else if (this.modalMode === 'edit') {
      this.courses.update(courses =>
        courses.map(c => c.id === this.currentCourse.id ? this.currentCourse : c)
      );
      this.notificationService.success('Course updated successfully!');
    }
    
    this.closeModal();
  }

  deleteCourse(id: number) {
    const course = this.courses().find(c => c.id === id);
    if (course && confirm(`Are you sure you want to delete "${course.name}"?`)) {
      this.courses.update(courses => courses.filter(c => c.id !== id));
      this.notificationService.warning('Course deleted successfully!');
    }
  }

  validateCourse(): boolean {
    if (!this.currentCourse.code || !this.currentCourse.name || !this.currentCourse.instructor) {
      this.notificationService.error('Please fill in all required fields');
      return false;
    }
    
    if (this.currentCourse.maxStudents < this.currentCourse.enrolledStudents) {
      this.notificationService.error('Max students cannot be less than enrolled students');
      return false;
    }
    
    if (new Date(this.currentCourse.endDate) <= new Date(this.currentCourse.startDate)) {
      this.notificationService.error('End date must be after start date');
      return false;
    }
    
    return true;
  }

  getDefaultThumbnail(): string {
    const thumbnails = [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=250&fit=crop'
    ];
    return thumbnails[Math.floor(Math.random() * thumbnails.length)];
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'active':
        return 'status-active';
      case 'upcoming':
        return 'status-upcoming';
      case 'completed':
        return 'status-completed';
      default:
        return '';
    }
  }

  getLevelClass(level: string): string {
    switch (level) {
      case 'Beginner':
        return 'level-beginner';
      case 'Intermediate':
        return 'level-intermediate';
      case 'Advanced':
        return 'level-advanced';
      default:
        return '';
    }
  }

  getCapacityPercentage(course: Course): number {
    return Math.round((course.enrolledStudents / course.maxStudents) * 100);
  }

  exportCourses() {
    const csv = this.convertToCSV(this.courses());
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'courses.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    this.notificationService.success('Courses data exported successfully!');
  }

  convertToCSV(data: Course[]): string {
    const headers = ['Code', 'Name', 'Instructor', 'Department', 'Credits', 'Level', 'Status', 'Enrolled', 'Max Students'];
    const rows = data.map(c => [
      c.code,
      c.name,
      c.instructor,
      c.department,
      c.credits,
      c.level,
      c.status,
      c.enrolledStudents,
      c.maxStudents
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }
}