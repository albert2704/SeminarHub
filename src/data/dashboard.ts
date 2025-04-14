
import { DashboardStats, TopicDistribution, MonthlySeminars } from '../types';

export const dashboardStats: DashboardStats = {
  totalSeminars: 102,
  totalUsers: 2450,
  uniqueLocations: 48,
  upcomingEvents: 26,
  seminarGrowth: 12,
  userGrowth: 5.2,
  locationGrowth: 3
};

export const topicDistribution: TopicDistribution[] = [
  { name: "Physics", value: 26, color: "#6c5ce7" },
  { name: "Computer Science", value: 21, color: "#74b9ff" },
  { name: "Biology", value: 17, color: "#0984e3" },
  { name: "Chemistry", value: 14, color: "#00cec9" },
  { name: "Mathematics", value: 11, color: "#00b894" },
  { name: "Medicine", value: 10, color: "#a3e635" }
];

export const monthlySeminars: MonthlySeminars[] = [
  { month: "Jan", count: 4 },
  { month: "Feb", count: 6 },
  { month: "Mar", count: 8 },
  { month: "Apr", count: 10 },
  { month: "May", count: 12 },
  { month: "Jun", count: 9 },
  { month: "Jul", count: 7 },
  { month: "Aug", count: 5 },
  { month: "Sep", count: 11 },
  { month: "Oct", count: 13 },
  { month: "Nov", count: 10 },
  { month: "Dec", count: 8 }
];
