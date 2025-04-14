export interface Seminar {
  id: string;
  title: string;
  description: string;
  presenter: string;
  organization: string;
  date: string;
  time: string;
  location: string;
  topics: string[];
  images: string[];
  agenda?: AgendaItem[];
  latitude?: number; // Add latitude
  longitude?: number; // Add longitude
  enrollmentNumber: number; // Add enrollment number
}

export interface AgendaItem {
  time: string;
  description: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'moderator' | 'admin';
}

export interface DashboardStats {
  totalSeminars: number;
  totalUsers: number;
  uniqueLocations: number;
  upcomingEvents: number;
  seminarGrowth: number;
  userGrowth: number;
  locationGrowth: number;
}

export interface TopicDistribution {
  name: string;
  value: number;
  color: string;
}

export interface MonthlySeminars {
  month: string;
  count: number;
}
