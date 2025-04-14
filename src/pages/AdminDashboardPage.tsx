import React from 'react';
import { Chart, registerables } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { useEffect, useRef } from 'react';

Chart.register(...registerables);

const AdminDashboardPage: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [{
            label: 'Seminars',
            data: [65, 59, 80, 81, 56, 55],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      return () => {
        chart.destroy();
      };
    }
  }, []);

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

  const pieChartData = {
    labels: ['Science', 'Technology', 'Engineering', 'Mathematics'],
    datasets: [
      {
        label: 'Seminars by Category',
        data: [12, 19, 3, 5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container py-4">
      <h1>Admin Dashboard</h1>

      <div className="row">
        <div className="col-md-6">
          <h2>Seminars Overview</h2>
          <canvas ref={chartRef} />
        </div>

        <div className="col-md-6">
          <h2>New Users</h2>
          <Line data={lineChartData} />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <h2>Seminars by Category</h2>
          <Pie data={pieChartData} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
