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

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // State for success/info messages
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    // Basic validation or API call would go here
    console.log("Password reset request for:", { email });

    // Simulate sending reset link
    setMessage(
      `Nếu tài khoản ${email} tồn tại, một liên kết đặt lại mật khẩu đã được gửi.`
    );

    // Optionally redirect after a delay or keep the user on the page
    // setTimeout(() => navigate('/login'), 5000);
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
            <h1 className="h3 mb-2 fw-bold">Quên mật khẩu?</h1>
            <p className="text-muted">
              Nhập địa chỉ email của bạn để đặt lại mật khẩu.
            </p>
          </div>

          {/* Forgot Password Card */}
          <div className="card shadow-sm">
            <div className="card-body p-4 p-md-5">
              {message && (
                <div className="alert alert-info small p-2 mb-3">{message}</div>
              )}
              <form onSubmit={handleSubmit}>
                {/* Email Input */}
                <div className="mb-4">
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

                {/* Submit Button */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-md">
                    Gửi đường dẫn đặt lại mật khẩu
                  </button>
                </div>
              </form>

              {/* Back to Login Link */}
              <p className="text-center text-muted mt-4 mb-0">
                Nhớ mật khẩu?{" "}
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

export default ForgotPasswordPage;
