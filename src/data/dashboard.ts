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
  { name: "Vật lý", value: 26, color: "#6c5ce7" },
  { name: "Khoa học máy tính", value: 21, color: "#74b9ff" },
  { name: "Sinh học", value: 17, color: "#0984e3" },
  { name: "Hóa học", value: 14, color: "#00cec9" },
  { name: "Toán học", value: 11, color: "#00b894" },
  { name: "Y học", value: 10, color: "#a3e635" }
];

export const monthlySeminars: MonthlySeminars[] = [
  { month: "Thg 1", count: 4 },
  { month: "Thg 2", count: 6 },
  { month: "Thg 3", count: 8 },
  { month: "Thg 4", count: 10 },
  { month: "Thg 5", count: 12 },
  { month: "Thg 6", count: 9 },
  { month: "Thg 7", count: 7 },
  { month: "Thg 8", count: 5 },
  { month: "Thg 9", count: 11 },
  { month: "Thg 10", count: 13 },
  { month: "Thg 11", count: 10 },
  { month: "Thg 12", count: 8 }
];
