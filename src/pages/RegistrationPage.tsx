import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Re-using the SVG icon component
const SeminarHubIcon = ({
  className,
  width = "24",
  height = "24",
}: {
  className?: string;
  width?: string;
  height?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="currentColor"
    className={className}
  >
    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
  </svg>
);

const RegistrationPage: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    // Basic validation or API call would go here
    console.log("Registration attempt:", { fullName, email });

    // Simulate successful registration and navigate to login
    // In a real app, you might automatically log the user in or show a success message
    navigate("/login");
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 col-xl-5">
          {/* Header */}
          <div className="text-center mb-4">
            <div
              className="mx-auto d-flex align-items-center justify-content-center bg-light rounded-circle mb-3"
              style={{ width: "60px", height: "60px" }}
            >
              <SeminarHubIcon className="text-primary" width="32" height="32" />
            </div>
            <h1 className="h3 mb-2 fw-bold">Tạo tài khoản SeminarHub</h1>
            <p className="text-muted">
              Tham gia cộng đồng để khám phá hội thảo
            </p>
          </div>

          {/* Registration Card */}
          <div className="card shadow-sm">
            <div className="card-body p-4 p-md-5">
              <h2 className="card-title text-center h4 mb-4">
                Đăng ký tài khoản mới
              </h2>
              {error && (
                <div className="alert alert-danger small p-2">{error}</div>
              )}
              <form onSubmit={handleSubmit}>
                {/* Full Name Input */}
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    placeholder="Nguyễn Văn A"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                {/* Email Input */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Địa chỉ email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="ban@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Password Input */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label mb-0">
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="••••••••"
                    required
                    minLength={6} // Example: enforce minimum length
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {/* Confirm Password Input */}
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="form-label mb-0">
                    Xác nhận mật khẩu
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="••••••••"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                {/* Submit Button */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Đăng ký
                  </button>
                </div>
              </form>

              {/* Login Link */}
              <p className="text-center text-muted mt-4 mb-0">
                Đã có tài khoản?{" "}
                <Link to="/login" className="fw-medium text-decoration-none">
                  Đăng nhập
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
