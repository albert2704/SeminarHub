import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-light border-top py-4 mt-auto">
      {" "}
      {/* Use bg-light and mt-auto */}
      <div className="container">
        <div className="row align-items-center">
          {/* Copyright */}
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0 text-muted small">
              © {year} SeminarHub. Đã đăng ký bản quyền.
            </p>
          </div>

          {/* Footer Links */}
          <div className="col-md-6 text-center text-md-end">
            <Link
              to="/about"
              className="text-muted small text-decoration-none me-3"
            >
              Về chúng tôi
            </Link>
            <Link
              to="/contact"
              className="text-muted small text-decoration-none me-3"
            >
              Liên hệ
            </Link>
            <Link
              to="/privacy" // Update link to point to the new route
              className="text-muted small text-decoration-none"
            >
              Chính sách bảo mật
            </Link>
            {/* Add social media icons or other links here if needed */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
