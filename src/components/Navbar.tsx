import React, { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Collapse } from "bootstrap"; // Keep Collapse import for getInstance

interface NavbarProps {
  userRole: "user" | "moderator" | "admin" | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ userRole, onLogout }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const collapseRef = useRef<HTMLDivElement>(null);
  const togglerRef = useRef<HTMLButtonElement>(null);
  // Removed collapseInstanceRef

  // Remove the useEffect that manually created the Collapse instance

  // Effect to close the navbar when the route changes
  useEffect(() => {
    if (
      collapseRef.current && // Check if the element exists
      togglerRef.current && // Check if the toggler exists
      collapseRef.current.classList.contains("show") && // Check if the collapse is currently shown
      getComputedStyle(togglerRef.current).display !== "none" // Check if toggler is visible (mobile view)
    ) {
      // Try to get the instance dynamically when needed
      const instance = Collapse.getInstance(collapseRef.current);
      // If an instance exists, hide it
      if (instance) {
        instance.hide();
      } else {
        // Optional: Log if instance couldn't be found - might indicate Bootstrap JS issue
        console.warn("Bootstrap Collapse instance not found for navbar.");
      }
    }
  }, [location]); // Re-run only when location changes

  // Logout handler - also ensures collapse closes
  const handleLogoutClick = () => {
    // Similar logic for logout, attempt to close if open
    if (
      collapseRef.current?.classList.contains("show") &&
      togglerRef.current &&
      getComputedStyle(togglerRef.current).display !== "none"
    ) {
      const instance = Collapse.getInstance(collapseRef.current);
      instance?.hide();
    }
    onLogout();
  };

  // Handler for the toggler button click
  const handleTogglerClick = () => {
    if (collapseRef.current) {
      const instance =
        Collapse.getInstance(collapseRef.current) ||
        new Collapse(collapseRef.current);
      instance.toggle();
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg shadow-sm navbar-light bg-white`}>
      <div className="container">
        <Link
          className="navbar-brand d-flex align-items-center"
          to="/"
          // No onClick needed here
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="#8B5CF6"
            className="me-2"
          >
            <path d="M19 4h-1V3c0-.55-.45-1-1-1s-1 .45-1 1v1H8V3c0-.55-.45-1-1-1s-1 .45-1 1v1H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
          </svg>
          <span className="ms-1">SeminarHub</span>
        </Link>

        {/* Standard Bootstrap toggler */}
        <button
          ref={togglerRef} // Keep ref for visibility check
          className="navbar-toggler order-lg-1 border-0 p-1"
          type="button"
          // data-bs-toggle="collapse" // Can be kept or removed, onClick will handle it
          // data-bs-target="#navbarNav" // Can be kept or removed
          aria-controls="navbarNav"
          aria-expanded={
            collapseRef.current?.classList.contains("show") ? "true" : "false"
          } // Dynamically set aria-expanded based on state if possible, or leave to Bootstrap if data-* attributes are kept
          aria-label="Chuyển đổi thanh điều hướng"
          onClick={handleTogglerClick} // Add the click handler
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          ref={collapseRef} // Keep ref for lookup
          className="collapse navbar-collapse"
          id="navbarNav"
        >
          {/* Remove lg-gap-2 gap-0 classes */}
          <ul className="navbar-nav me-auto">
            {/* Links inside the collapse - no onClick needed for closing */}
            <li className="nav-item">
              <Link
                className={`nav-link ${currentPath === "/" ? "active" : ""}`}
                to="/"
              >
                Trang chủ
              </Link>
            </li>
            {/* Conditionally render "Tìm hội thảo" link */}
            {userRole !== "moderator" && (
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    currentPath.startsWith("/seminars") ? "active" : ""
                  }`}
                  to="/seminars"
                >
                  Tìm hội thảo
                </Link>
              </li>
            )}
            {/* ... other nav items ... */}
            {(userRole === null || userRole === "user") && (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      currentPath === "/about" ? "active" : ""
                    }`}
                    to="/about"
                  >
                    Về chúng tôi
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      currentPath === "/contact" ? "active" : ""
                    }`}
                    to="/contact"
                  >
                    Liên hệ
                  </Link>
                </li>
              </>
            )}
            {userRole === "user" && (
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    currentPath === "/my-enrollments" ? "active" : ""
                  }`}
                  to="/my-enrollments"
                >
                  Hội thảo đã đăng ký
                </Link>
              </li>
            )}
            {userRole === "moderator" && (
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    // Update condition to include edit and new paths
                    currentPath.startsWith("/moderator") ||
                    currentPath.startsWith("/seminars/edit/") ||
                    currentPath === "/seminars/new"
                      ? "active"
                      : ""
                  }`}
                  to="/moderator"
                >
                  Bảng điều khiển quản trị
                </Link>
              </li>
            )}
            {userRole === "admin" && (
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    currentPath.startsWith("/admin") ? "active" : ""
                  }`}
                  to="/admin"
                >
                  Bảng điều khiển admin
                </Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center">
            {userRole ? (
              <button
                onClick={handleLogoutClick} // Use updated handler
                className={`btn btn-outline-primary me-2 d-flex align-items-center`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-box-arrow-right me-1"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-1 0v2z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                  />
                </svg>
                Đăng xuất
              </button>
            ) : (
              <Link
                to="/login"
                className={`btn btn-outline-primary d-flex align-items-center`}
                // No custom onClick
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="me-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                  />
                </svg>
                <span className="ms-1">Đăng nhập</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
