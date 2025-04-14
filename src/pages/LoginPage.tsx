import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner"; // Import toast

// Re-using the SVG icon component from the previous version
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

// Define props interface to accept setUserRole
interface LoginPageProps {
  setUserRole: (role: "user" | "moderator" | "admin" | null) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setUserRole }) => {
  // Accept setUserRole prop
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null); // Add error state
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    console.log("Login attempt:", { email });

    let role: "admin" | "moderator" | "user" | null = null;
    let redirectPath = "/";

    // For demo purposes only
    if (email === "admin@example.com" && password === "password") {
      role = "admin";
      redirectPath = "/admin";
    } else if (email === "moderator@example.com" && password === "password") {
      role = "moderator";
      redirectPath = "/moderator";
    } else if (email && password) {
      // Simulate login for any other valid credentials
      role = "user";
      redirectPath = "/";
    }

    if (role) {
      // Store role in localStorage
      localStorage.setItem("userRole", role);
      // Update the state in App component directly
      setUserRole(role);
      // Show success toast
      toast.success("Đăng nhập thành công!");
      // Navigate to the appropriate page
      navigate(redirectPath);
    } else {
      // Handle login failure
      const errorMessage = "Email hoặc mật khẩu không đúng.";
      setError(errorMessage); // Set error message
      toast.error(errorMessage); // Show error toast
      console.error("Login failed: Invalid credentials");
    }
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
            <h1 className="h3 mb-2 fw-bold">Đăng nhập vào SeminarHub</h1>
            <p className="text-muted">
              Truy cập tài khoản của bạn để quản lý hội thảo
            </p>
          </div>
          {/* Login Card */}
          <div className="card shadow-sm">
            <div className="card-body p-4 p-md-5">
              <h2 className="card-title text-center h4 mb-4">
                Chào mừng trở lại
              </h2>
              {/* Display error message */}
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
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
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label htmlFor="password" className="form-label mb-0">
                      Mật khẩu
                    </label>
                    <Link
                      to="/forgot-password"
                      className="form-text text-decoration-none"
                    >
                      {" "}
                      {/* Updated link */}
                      Quên mật khẩu?
                    </Link>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {/* Submit Button */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Đăng nhập
                  </button>
                </div>
              </form>

              {/* Sign Up Link */}
              <p className="text-center text-muted mt-4 mb-0">
                Chưa có tài khoản?{" "}
                <Link to="/signup" className="fw-medium text-decoration-none">
                  Đăng ký
                </Link>
              </p>
            </div>
            {/* Demo Info Footer */}
            <div className="card-footer bg-light text-center py-3 px-4">
              <p className="text-muted small mb-1">Tài khoản demo</p>
              <p className="small mb-0">
                Kiểm duyệt viên:{" "}
                <code className="bg-white px-1 rounded">
                  moderator@example.com
                </code>{" "}
                / <code className="bg-white px-1 rounded">password</code>
              </p>
              <p className="small mb-1">
                Quản trị viên:{" "}
                <code className="bg-white px-1 rounded">admin@example.com</code>{" "}
                / <code className="bg-white px-1 rounded">password</code>
              </p>
            </div>
          </div>{" "}
          {/* Add missing closing div */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
