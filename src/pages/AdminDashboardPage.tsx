import {
  Chart as ChartJS,
  registerables,
  ChartOptions,
  LegendItem,
} from "chart.js"; // Import LegendItem
import { Bar, Line, Pie } from "react-chartjs-2";
import { Link } from "react-router-dom"; // Import Link
import {
  dashboardStats,
  topicDistribution,
  monthlySeminars,
} from "@/data/dashboard"; // Use path alias
import { seminars } from "@/data/seminars"; // Use path alias

// Register Chart.js components
ChartJS.register(...registerables);

// Remove theme prop from function signature
const AdminDashboardPage = () => {
  // Define fixed colors for light mode
  // const isDarkMode = theme === 'dark'; // Remove
  const textColor = "rgba(0, 0, 0, 0.8)"; // Slightly darker text for better contrast
  const tooltipBgColor = "rgba(255, 255, 255, 0.9)"; // White background for tooltip
  const tooltipBorderColor = "rgba(0, 0, 0, 0.1)"; // Subtle border for tooltip
  const gridColor = "rgba(0, 0, 0, 0.1)"; // Fixed light mode color
  const primaryChartColor = "#8B5CF6"; // Fixed light mode color
  const primaryChartBg = "rgba(139, 92, 246, 0.2)"; // Fixed light mode color

  // Define common chart options with fixed colors
  const commonChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: textColor, // Use fixed color
        },
      },
      // Add tooltip configuration
      tooltip: {
        backgroundColor: tooltipBgColor,
        titleColor: textColor,
        bodyColor: textColor,
        footerColor: textColor, // Color for potential footer text
        borderColor: tooltipBorderColor,
        borderWidth: 1,
        padding: 10, // Add some padding
        cornerRadius: 4, // Slightly rounded corners
        // Use callbacks to customize further if needed
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColor, // Use fixed color
        },
        grid: {
          color: gridColor, // Use fixed color
        },
      },
      y: {
        ticks: {
          color: textColor, // Use fixed color
        },
        grid: {
          color: gridColor, // Use fixed color
        },
      },
    },
  };

  // Specific options for Pie chart (no scales) with fixed colors
  const pieChartOptions: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: true, // Keep aspect ratio for Pie
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: textColor,
        },
        // Add onHover and onLeave callbacks
        onHover: (event, legendItem: LegendItem, legend) => {
          // 'event.native' might be null in some contexts, check before use
          const target = event.native?.target as HTMLElement;
          if (target) {
            target.style.cursor = "pointer";
            // Note: Directly changing text color here might be difficult
            // due to how Chart.js renders legend items (often in canvas or complex divs).
            // The CSS approach is generally preferred for styling.
            // If CSS failed, it might indicate a specificity issue or Chart.js overriding.
          }
        },
        onLeave: (event, legendItem: LegendItem, legend) => {
          const target = event.native?.target as HTMLElement;
          if (target) {
            target.style.cursor = "default";
          }
        },
      },
      // Add consistent tooltip configuration for Pie chart
      tooltip: {
        backgroundColor: tooltipBgColor,
        titleColor: textColor,
        bodyColor: textColor,
        footerColor: textColor,
        borderColor: tooltipBorderColor,
        borderWidth: 1,
        padding: 10,
        cornerRadius: 4,
      },
    },
  };

  // Monthly seminars bar chart data (using fixed colors)
  const barChartData = {
    labels: monthlySeminars.map((item) => item.month),
    datasets: [
      {
        label: "Hội thảo hàng tháng", // Updated label
        data: monthlySeminars.map((item) => item.count),
        backgroundColor: primaryChartBg, // Use fixed color
        borderColor: primaryChartColor, // Use fixed color
        borderWidth: 1,
      },
    ],
  };

  // User growth line chart data (using fixed colors)
  const lineChartData = {
    labels: ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"], // Updated labels
    datasets: [
      {
        label: "Người dùng mới", // Updated label
        data: [120, 150, 180, 170],
        fill: false,
        backgroundColor: primaryChartColor, // Use fixed color
        borderColor: primaryChartColor, // Use fixed color
        tension: 0.1, // Optional: makes the line smoother
      },
    ],
  };

  // Topic distribution pie chart data (using fixed colors)
  const pieChartData = {
    labels: topicDistribution.map((item) => item.name),
    datasets: [
      {
        label: "Hội thảo theo Chủ đề", // Updated label
        data: topicDistribution.map((item) => item.value),
        backgroundColor: topicDistribution.map(
          (item) => item.color || primaryChartBg // Use fixed fallback
        ),
        borderColor: "rgba(255, 255, 255, 0.8)", // Fixed light mode border
        borderWidth: 1,
        // Add hover properties
        hoverBackgroundColor: topicDistribution.map(
          (item) => item.color || primaryChartBg // Reuse the same colors for hover, or define darker/lighter shades
        ),
        hoverBorderColor: "rgba(255, 255, 255, 1)", // Make border slightly more opaque on hover
        hoverBorderWidth: 2, // Optional: Increase border width on hover
      },
    ],
  };

  // Select first few seminars as "upcoming" for demo purposes
  const upcomingSeminars = seminars.slice(0, 4); // Get first 4 seminars

  return (
    <div className="container py-5">
      {" "}
      {/* Increased top/bottom padding */}
      <h1 className="mb-4">Bảng Điều Khiển Admin</h1>{" "}
      {/* Changed text to Vietnamese */}
      {/* Stats Overview */}
      <div className="row g-4 mb-4">
        {" "}
        {/* Added g-4 for consistent gap */}
        {/* Stat Card 1 */}
        <div className="col-md-6 col-lg-3">
          {/* Use lighter background, subtle shadow, consistent height */}
          <div className="card h-100 shadow-sm border-0 bg-primary-subtle">
            <div className="card-body d-flex flex-column">
              <h6 className="card-subtitle mb-2 text-muted">
                Tổng số Hội thảo
              </h6>{" "}
              {/* Changed title to subtitle */}
              <h2 className="card-title mb-1">
                {dashboardStats.totalSeminars}
              </h2>
              <p className="card-text mt-auto mb-0">
                {" "}
                {/* Pushed to bottom */}
                <small className="text-success">
                  {" "}
                  {/* Use text-success for growth */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="me-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
                    />
                  </svg>
                  {dashboardStats.seminarGrowth}% tháng trước
                </small>
              </p>
            </div>
          </div>
        </div>
        {/* Stat Card 2 */}
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 shadow-sm border-0 bg-success-subtle">
            <div className="card-body d-flex flex-column">
              <h6 className="card-subtitle mb-2 text-muted">
                Tổng số Người dùng
              </h6>
              <h2 className="card-title mb-1">{dashboardStats.totalUsers}</h2>
              <p className="card-text mt-auto mb-0">
                <small className="text-success">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="me-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
                    />
                  </svg>
                  {dashboardStats.userGrowth}% tháng trước
                </small>
              </p>
            </div>
          </div>
        </div>
        {/* Stat Card 3 */}
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 shadow-sm border-0 bg-info-subtle">
            <div className="card-body d-flex flex-column">
              <h6 className="card-subtitle mb-2 text-muted">Địa điểm</h6>
              <h2 className="card-title mb-1">
                {dashboardStats.uniqueLocations}
              </h2>
              <p className="card-text mt-auto mb-0">
                <small className="text-success">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="me-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
                    />
                  </svg>
                  {dashboardStats.locationGrowth}% tháng trước
                </small>
              </p>
            </div>
          </div>
        </div>
        {/* Stat Card 4 */}
        <div className="col-md-6 col-lg-3">
          {/* Wrap card div in Link */}
          <Link
            to="/seminars?filter=upcoming"
            className="text-decoration-none stat-card-link"
          >
            <div className="card h-100 shadow-sm border-0 bg-warning-subtle">
              <div className="card-body d-flex flex-column">
                <h6 className="card-subtitle mb-2 text-muted">
                  Sự kiện sắp tới
                </h6>
                <h2 className="card-title mb-1">
                  {dashboardStats.upcomingEvents}
                </h2>
                <p className="card-text mt-auto mb-0">
                  <small className="text-muted">Trong 30 ngày tới</small>{" "}
                  {/* Use text-muted */}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      {/* Charts */}
      <div className="row g-4">
        {" "}
        {/* Added g-4 */}
        {/* Bar Chart */}
        <div className="col-lg-6">
          {" "}
          {/* Changed to lg-6 */}
          <div className="card h-100 shadow-sm border-0">
            {" "}
            {/* Added h-100, shadow, border-0 */}
            <div className="card-header bg-body border-0 pt-3">
              {" "}
              {/* Adjusted header */}
              <h5 className="card-title mb-0">Hội thảo hàng tháng</h5>
            </div>
            <div className="card-body">
              <Bar
                data={barChartData}
                options={commonChartOptions as ChartOptions<"bar">} // Apply common options
              />
            </div>
          </div>
        </div>
        {/* Line Chart */}
        <div className="col-lg-6">
          {" "}
          {/* Changed to lg-6 */}
          <div className="card h-100 shadow-sm border-0">
            {" "}
            {/* Added h-100, shadow, border-0 */}
            <div className="card-header bg-body border-0 pt-3">
              {" "}
              {/* Adjusted header */}
              <h5 className="card-title mb-0">Người dùng mới</h5>
            </div>
            <div className="card-body">
              <Line
                data={lineChartData}
                options={commonChartOptions as ChartOptions<"line">} // Apply common options
              />
            </div>
          </div>
        </div>
        {/* Pie Chart */}
        <div className="col-lg-6">
          {" "}
          {/* Changed to lg-6 */}
          <div className="card h-100 shadow-sm border-0">
            {" "}
            {/* Added h-100, shadow, border-0 */}
            <div className="card-header bg-body border-0 pt-3">
              {" "}
              {/* Adjusted header */}
              <h5 className="card-title mb-0">Hội thảo theo Chủ đề</h5>
            </div>
            <div className="card-body d-flex justify-content-center align-items-center">
              {" "}
              {/* Center pie chart */}
              <div
                id="topicPieChartContainer"
                style={{ maxWidth: "350px", width: "100%" }}
              >
                {" "}
                {/* Constrain pie chart size */}
                <Pie
                  data={pieChartData}
                  options={pieChartOptions} // Apply updated pie-specific options
                />
              </div>
            </div>
          </div>
        </div>
        {/* Upcoming Seminars List */}
        <div className="col-lg-6">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-header bg-body border-0 pt-3">
              {/* Update card title */}
              <h5 className="card-title mb-0">Hội thảo sắp tới</h5>
            </div>
            <div className="card-body">
              {/* Replace placeholder with list */}
              {upcomingSeminars.length > 0 ? (
                <ul className="list-group list-group-flush">
                  {upcomingSeminars.map((seminar) => (
                    <li
                      key={seminar.id}
                      className="list-group-item d-flex justify-content-between align-items-center px-0" // Remove default padding
                    >
                      <div>
                        <Link
                          to={`/seminars/${seminar.id}`}
                          className="text-decoration-none fw-medium"
                        >
                          {seminar.title}
                        </Link>
                        {/* Display Date only */}
                        <div className="small text-muted mt-1">
                          <span>{seminar.date}</span>
                          {/* Removed enrollment number from here */}
                        </div>
                      </div>
                      {/* Wrapper for badge and button */}
                      <div className="d-flex align-items-center">
                        {/* Enrollment Badge */}
                        <span className="badge bg-light text-dark me-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            className="me-1"
                          >
                            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                            <path
                              fillRule="evenodd"
                              d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
                            />
                            <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                          </svg>
                          {seminar.enrollmentNumber}
                        </span>
                        <Link
                          to={`/seminars/${seminar.id}`}
                          className="btn btn-sm btn-outline-primary"
                        >
                          Xem
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">Không có hội thảo nào sắp tới.</p>
              )}
            </div>
            {/* Optional: Add a footer link to see all */}
            <div className="card-footer text-center bg-body border-0 pb-3">
              <Link to="/seminars" className="btn btn-sm btn-outline-primary">
                Xem tất cả hội thảo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
