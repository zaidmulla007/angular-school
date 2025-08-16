import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Stat {
  icon: string;
  value: string;
  label: string;
  change: number;
  color: string;
}

interface Activity {
  icon: string;
  title: string;
  description: string;
  time: string;
  color: string;
}

interface ScheduleEvent {
  time: string;
  title: string;
  location: string;
  participants: string[];
  active?: boolean;
}

interface QuickAction {
  icon: string;
  label: string;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });

  Math = Math; // Expose Math to template

  stats: Stat[] = [
    {
      icon: 'fas fa-user-graduate',
      value: '1,234',
      label: 'Total Students',
      change: 12,
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      icon: 'fas fa-chalkboard-teacher',
      value: '89',
      label: 'Total Teachers',
      change: 5,
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      icon: 'fas fa-school',
      value: '45',
      label: 'Total Classes',
      change: -2,
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      icon: 'fas fa-dollar-sign',
      value: '$45.2k',
      label: 'Revenue This Month',
      change: 23,
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    }
  ];

  activities: Activity[] = [
    {
      icon: 'fas fa-user-plus',
      title: 'New Student Enrolled',
      description: 'Sarah Johnson joined Grade 10-A',
      time: '2 hours ago',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      icon: 'fas fa-trophy',
      title: 'Competition Winner',
      description: 'Math Olympiad first prize announced',
      time: '4 hours ago',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      icon: 'fas fa-calendar-check',
      title: 'Event Scheduled',
      description: 'Annual Sports Day on March 15',
      time: '1 day ago',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      icon: 'fas fa-bullhorn',
      title: 'Announcement',
      description: 'Parent-Teacher meeting next week',
      time: '2 days ago',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    }
  ];

  todaySchedule: ScheduleEvent[] = [
    {
      time: '09:00',
      title: 'Morning Assembly',
      location: 'Main Hall',
      participants: [
        'https://randomuser.me/api/portraits/men/1.jpg',
        'https://randomuser.me/api/portraits/women/2.jpg',
        'https://randomuser.me/api/portraits/men/3.jpg',
        'https://randomuser.me/api/portraits/women/4.jpg'
      ]
    },
    {
      time: '10:30',
      title: 'Staff Meeting',
      location: 'Conference Room',
      participants: [
        'https://randomuser.me/api/portraits/men/5.jpg',
        'https://randomuser.me/api/portraits/women/6.jpg'
      ],
      active: true
    },
    {
      time: '14:00',
      title: 'Parent Visit',
      location: 'Principal Office',
      participants: [
        'https://randomuser.me/api/portraits/men/7.jpg'
      ]
    },
    {
      time: '16:00',
      title: 'Sports Practice Review',
      location: 'Sports Ground',
      participants: [
        'https://randomuser.me/api/portraits/men/8.jpg',
        'https://randomuser.me/api/portraits/women/9.jpg',
        'https://randomuser.me/api/portraits/men/10.jpg'
      ]
    }
  ];

  quickActions: QuickAction[] = [
    {
      icon: 'fas fa-user-plus',
      label: 'Add Student',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      icon: 'fas fa-clipboard-check',
      label: 'Take Attendance',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      icon: 'fas fa-file-invoice',
      label: 'Generate Report',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      icon: 'fas fa-envelope',
      label: 'Send Notice',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
      icon: 'fas fa-calendar-plus',
      label: 'Schedule Event',
      color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
      icon: 'fas fa-money-check',
      label: 'Collect Fees',
      color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
    }
  ];

  constructor() {}

  ngOnInit(): void {
    // Initialize charts here
    this.initCharts();
  }

  initCharts() {
    // You would initialize your charts here using Chart.js or similar
    // This is a placeholder for the actual implementation
  }
}