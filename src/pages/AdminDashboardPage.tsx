
import React from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { useEffect, useRef } from 'react';
import { 
  dashboardStats, 
  topicDistribution, 
  monthlySeminars 
} from '../data/dashboard';

// Register Chart.js components
ChartJS.register(...registerables);

const AdminDashboardPage: React.FC = () => {
  // Monthly seminars bar chart
  const barChartData = {
    labels: monthlySeminars.map(item => item.month),
    datasets: [
      {
        label: 'Monthly Seminars',
        data: monthlySeminars.map(item => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  // User growth line chart
  const lineChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'New Users',
        data: [120, 150, 180, 170],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  // Topic distribution pie chart
  const pieChartData = {
    labels: topicDistribution.map(item => item.name),
    datasets: [
      {
        label: 'Seminars by Category',
        data: topicDistribution.map(item => item.value),
        backgroundColor: topicDistribution.map(item => item.color || 'rgba(75, 192, 192, 0.2)'),
        borderColor: topicDistribution.map(() => 'rgba(255, 255, 255, 0.5)'),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Admin Dashboard</h1>

      {/* Stats Overview */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h5 className="card-title">Total Seminars</h5>
              <h2>{dashboardStats.totalSeminars}</h2>
              <p className="card-text">
                <small>
                  <i className="bi bi-arrow-up"></i> {dashboardStats.seminarGrowth}% from last month
                </small>
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <h2>{dashboardStats.totalUsers}</h2>
              <p className="card-text">
                <small>
                  <i className="bi bi-arrow-up"></i> {dashboardStats.userGrowth}% from last month
                </small>
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h5 className="card-title">Locations</h5>
              <h2>{dashboardStats.uniqueLocations}</h2>
              <p className="card-text">
                <small>
                  <i className="bi bi-arrow-up"></i> {dashboardStats.locationGrowth}% from last month
                </small>
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-dark">
            <div className="card-body">
              <h5 className="card-title">Upcoming Events</h5>
              <h2>{dashboardStats.upcomingEvents}</h2>
              <p className="card-text">
                <small>Next 30 days</small>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="card-title">Monthly Seminars</h5>
            </div>
            <div className="card-body">
              <Bar data={barChartData} options={{ responsive: true }} />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="card-title">New Users</h5>
            </div>
            <div className="card-body">
              <Line data={lineChartData} options={{ responsive: true }} />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Seminars by Category</h5>
            </div>
            <div className="card-body">
              <Pie data={pieChartData} options={{ responsive: true }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
