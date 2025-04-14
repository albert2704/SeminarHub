export interface Seminar {
  id: string;
  title: string;
  description: string;
  presenter: string;
  organization: string;
  date: string; // Consider using Date object if more manipulation needed
  time: string;
  location: string;
  topics: string[];
  agenda?: { time: string; description: string }[];
  images?: string[]; // Ensure the '?' is present here
  latitude?: number; // Add latitude
  longitude?: number; // Add longitude
  enrollmentNumber: number; // Add enrollment number
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
  color?: string; // Optional color for charts
}

export interface MonthlySeminars {
  month: string;
  count: number;
}
