
import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { dashboardStats, topicDistribution, monthlySeminars } from '../data/dashboard';

// Register Chart.js components
Chart.register(...registerables);

const AdminDashboardPage: React.FC = () => {
  const monthlyChartRef = useRef<HTMLCanvasElement | null>(null);
  const topicChartRef = useRef<HTMLCanvasElement | null>(null);
  const [activeTab, setActiveTab] = React.useState('overview');
  
  useEffect(() => {
    if (monthlyChartRef.current) {
      const monthlyChart = new Chart(monthlyChartRef.current, {
        type: 'bar',
        data: {
          labels: monthlySeminars.map(item => item.month),
          datasets: [{
            label: 'Seminars',
            data: monthlySeminars.map(item => item.count),
            backgroundColor: '#8b5cf6',
            borderWidth: 0,
            borderRadius: 4
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                display: true,
                color: '#e5e7eb',
                drawBorder: false,
              },
              ticks: {
                stepSize: 4
              }
            },
            x: {
              grid: {
                display: false,
                drawBorder: false
              }
            }
          },
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });
      
      return () => {
        monthlyChart.destroy();
      };
    }
  }, []);
  
  useEffect(() => {
    if (topicChartRef.current) {
      const topicChart = new Chart(topicChartRef.current, {
        type: 'pie',
        data: {
          labels: topicDistribution.map(item => item.name),
          datasets: [{
            data: topicDistribution.map(item => item.value),
            backgroundColor: topicDistribution.map(item => item.color),
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                usePointStyle: true,
                padding: 20
              }
            }
          }
        }
      });
      
      return () => {
        topicChart.destroy();
      };
    }
  }, []);
  
  return (
    <div className="container py-4">
      <h1 className="mb-4">Admin Dashboard</h1>
      
      <div className="row g-4 mb-4">
        <div className="col-md-6 col-lg-3">
          <div className="card dashboard-stat h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="text-muted mb-0">Total Seminars</h6>
                  <h2 className="stat-value">{dashboardStats.totalSeminars}</h2>
                  <span className={`stat-change positive`}>
                    +{dashboardStats.seminarGrowth}% from last month
                  </span>
                </div>
                <div className="stat-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-3">
          <div className="card dashboard-stat h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="text-muted mb-0">Active Users</h6>
                  <h2 className="stat-value">{dashboardStats.totalUsers.toLocaleString()}</h2>
                  <span className={`stat-change positive`}>
                    +{dashboardStats.userGrowth}% from last month
                  </span>
                </div>
                <div className="stat-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-3">
          <div className="card dashboard-stat h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="text-muted mb-0">Unique Locations</h6>
                  <h2 className="stat-value">{dashboardStats.uniqueLocations}</h2>
                  <span className={`stat-change positive`}>
                    +{dashboardStats.locationGrowth} from last month
                  </span>
                </div>
                <div className="stat-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 col-lg-3">
          <div className="card dashboard-stat h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="text-muted mb-0">Upcoming Events</h6>
                  <h2 className="stat-value">{dashboardStats.upcomingEvents}</h2>
                  <span className="text-muted stat-change">
                    Scheduled in next 30 days
                  </span>
                </div>
                <div className="stat-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ul className="nav nav-tabs dashboard-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="me-2">
              <path d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2Z"/>
            </svg>
            Overview
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'seminars' ? 'active' : ''}`}
            onClick={() => setActiveTab('seminars')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="me-2">
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
            </svg>
            Seminars
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'topics' ? 'active' : ''}`}
            onClick={() => setActiveTab('topics')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="me-2">
              <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z"/>
            </svg>
            Topics
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'locations' ? 'active' : ''}`}
            onClick={() => setActiveTab('locations')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="me-2">
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            </svg>
            Locations
          </button>
        </li>
      </ul>
      
      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#6c5ce7" viewBox="0 0 16 16" className="me-2">
                  <path d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z"/>
                </svg>
                <h5 className="card-title mb-0">Monthly Seminars</h5>
              </div>
              <p className="text-muted mb-4">Number of seminars per month in 2025</p>
              <div>
                <canvas ref={monthlyChartRef} height="250"></canvas>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-lg-6">
          <div className="card h-100">
            <div className="card-body">
              <div className="d-flex align-items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#6c5ce7" viewBox="0 0 16 16" className="me-2">
                  <path d="M11.776 4.454a.5.5 0 0 1 .448.546l-.31 2.066c.015.017.036.025.052.041l1.864-1.467a.5.5 0 0 1 .636.06l1.254 1.254a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.598.067l-1.881-1.045A.5.5 0 0 1 12 8.5V11a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.059l-.277.277a.5.5 0 0 1-.3.135l-2.5.5a.5.5 0 0 1-.551-.706l.79-1.58-1.144-.144a.5.5 0 0 1-.407-.63l.5-1.5a.5.5 0 0 1 .407-.37l2-.25a.5.5 0 0 1 .557.376l.901 3.603a.5.5 0 0 1-.31.572l-1.5.75a.5.5 0 0 1-.704-.44l-.315-2.43-1.222.61A.5.5 0 0 1 5 7.751v-.292l-1.518-.949a.5.5 0 0 1-.18-.686l1-1.5a.5.5 0 0 1 .686-.18l3.6 2.4a.5.5 0 0 1 .188.686l-.5.753.336.136a.5.5 0 0 1 .264.543l-.315 2.52a.5.5 0 0 1-.402.402l-1.5.25a.5.5 0 0 1-.554-.386l-.79-3.5a.5.5 0 0 1 .339-.579l1.777-.56a.5.5 0 0 1 .486.128l.626.626.937-1.873a.5.5 0 0 1 .631-.24l1.315.659a.499.499 0 0 1 .287.576l-.7 3.5a.5.5 0 0 1-.48.392h-2a.5.5 0 0 1-.498-.45l-.6-5.5a.5.5 0 0 1 .45-.547l1.5-.15Zm.292.657l-.486.486.485.485.486-.485-.485-.486Zm3.621 3.622-.486.486.485.485.486-.485-.485-.486Z"/>
                </svg>
                <h5 className="card-title mb-0">Seminar Topics</h5>
              </div>
              <p className="text-muted mb-4">Distribution of seminars by topic</p>
              <div>
                <canvas ref={topicChartRef} height="250"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
