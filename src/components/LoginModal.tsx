import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner"; // Import toast

// Define props interface
interface LoginModalProps {
  show: boolean;
  onClose: () => void;
  setUserRole: (role: "user" | "moderator" | "admin") => void; // Simplified role setting
}

// Re-using the SVG icon component from LoginPage for consistency
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

const LoginModal: React.FC<LoginModalProps> = ({
  show,
  onClose,
  setUserRole,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null); // State for login errors

  // Effect to add/remove body class for modal backdrop handling
  useEffect(() => {
    if (show) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    // Cleanup function
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [show]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    console.log("Modal Login attempt:", { email });

    let role: "admin" | "moderator" | "user" | null = null;

    // Demo login logic (same as LoginPage)
    if (email === "admin@example.com" && password === "password") {
      role = "admin";
    } else if (email === "moderator@example.com" && password === "password") {
      role = "moderator";
    } else if (email && password) {
      // Simulate login for any other valid credentials
      role = "user";
    }

    if (role) {
      localStorage.setItem("userRole", role);
      setUserRole(role);
      toast.success("Đăng nhập thành công!"); // Show success toast
      onClose(); // Close modal on successful login
      // Reset form fields
      setEmail("");
      setPassword("");
    } else {
      setError("Email hoặc mật khẩu không đúng."); // Set error message
      console.error("Login failed: Invalid credentials");
    }
  };

  // Handle closing the modal via backdrop click (optional, Bootstrap might handle this)
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!show) {
    return null;
  }

  return (
    <>
      <div
        className="modal fade show"
        tabIndex={-1}
        style={{ display: "block" }}
        aria-modal="true"
        role="dialog"
        onClick={handleBackdropClick} // Handle backdrop click
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0 pb-0">
              {/* Optional: Add a title or keep it minimal */}
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body px-4 pt-2 pb-4 px-md-5">
              {/* Header */}
              <div className="text-center mb-4">
                <div
                  className="mx-auto d-flex align-items-center justify-content-center bg-light rounded-circle mb-3"
                  style={{ width: "50px", height: "50px" }}
                >
                  <SeminarHubIcon
                    className="text-primary"
                    width="28"
                    height="28"
                  />
                </div>
                <h1 className="h4 mb-2 fw-bold">Đăng nhập</h1>
                <p className="text-muted small">
                  Truy cập tài khoản SeminarHub của bạn.
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="alert alert-danger small py-2" role="alert">
                    {error}
                  </div>
                )}
                <div className="mb-3">
                  <label htmlFor="modal-email" className="form-label">
                    Địa chỉ email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="modal-email"
                    placeholder="ban@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label htmlFor="modal-password" className="form-label mb-0">
                      Mật khẩu
                    </label>
                    {/* Link to forgot password page (opens in new tab or navigates) */}
                    <Link
                      to="/forgot-password"
                      className="form-text text-decoration-none small"
                      onClick={onClose} // Close modal if navigating away
                    >
                      Quên mật khẩu?
                    </Link>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    id="modal-password"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="d-grid mt-4">
                  <button type="submit" className="btn btn-primary">
                    Đăng nhập
                  </button>
                </div>
              </form>

              {/* Sign Up Link */}
              <p className="text-center text-muted small mt-3 mb-0">
                Chưa có tài khoản?{" "}
                <Link
                  to="/signup"
                  className="fw-medium text-decoration-none"
                  onClick={onClose} // Close modal if navigating away
                >
                  Đăng ký
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default LoginModal;
