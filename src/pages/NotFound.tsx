import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Estimate Navbar + Footer height (e.g., 70px + 80px = 150px).
  const approxHeaderFooterHeight = "150px";

  return (
    // Use d-flex for centering. Set min-height using vh and calc().
    <div
      className="d-flex align-items-center justify-content-center bg-light"
      style={{ minHeight: `calc(100vh - ${approxHeaderFooterHeight})` }}
    >
      <div className="text-center">
        {/* Use Bootstrap text utilities */}
        <h1 className="display-1 fw-bold mb-4">404</h1>
        <p className="h4 text-muted mb-4">Oops! Trang không tồn tại</p>
        <Link to="/" className="btn btn-primary">
          Quay về Trang chủ
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
