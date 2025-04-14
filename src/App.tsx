import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom"; // Import useNavigate
import Navbar from "@/components/Navbar"; // Use path alias
import Footer from "@/components/Footer"; // Use path alias
import HomePage from "@/pages/HomePage"; // Use path alias
import SeminarListPage from "@/pages/SeminarListPage"; // Use path alias
import SeminarDetailPage from "@/pages/SeminarDetailPage"; // Use path alias
import SeminarFormPage from "@/pages/SeminarFormPage"; // Use path alias
import LoginPage from "@/pages/LoginPage"; // Use path alias
import ModeratorDashboardPage from "@/pages/ModeratorDashboardPage"; // Use path alias
import AdminDashboardPage from "@/pages/AdminDashboardPage"; // Use path alias
import MyEnrollmentsPage from "@/pages/MyEnrollmentsPage"; // Use path alias
import NotFound from "@/pages/NotFound"; // Use path alias
import AboutPage from "@/pages/AboutPage"; // Import AboutPage
import ContactPage from "@/pages/ContactPage"; // Import ContactPage
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage"; // Import the new page
import { Toaster, toast } from "sonner"; // Import Toaster and toast
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "leaflet/dist/leaflet.css";
import "@/index.css"; // Use path alias for index.css as well
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import RegistrationPage from "./pages/RegistrationPage";

// Define a component to handle navigation within the Router context
const LogoutHandler: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    onLogout(); // Update the state in App
    toast.success("Đăng xuất thành công!"); // Show toast
    navigate("/"); // Navigate to home page
  };

  return null; // This component doesn't render anything itself
};

function App() {
  // State to hold the user's role
  const [userRole, setUserRole] = useState<
    "user" | "moderator" | "admin" | null
  >(null);

  // Effect to check localStorage on initial load
  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (
      storedRole === "user" ||
      storedRole === "moderator" ||
      storedRole === "admin"
    ) {
      setUserRole(storedRole);
    }
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("userRole");
    setUserRole(null);
    // Optionally navigate to home or login page
    // navigate('/'); // Requires useNavigate hook if used here
    console.log("User logged out");
  };

  return (
    <Router>
      <AppContent
        userRole={userRole}
        setUserRole={setUserRole}
        handleLogout={handleLogout}
      />
    </Router>
  );
}

// Create a wrapper component to use useNavigate
const AppContent: React.FC<{
  userRole: "user" | "moderator" | "admin" | null;
  setUserRole: (role: "user" | "moderator" | "admin" | null) => void;
  handleLogout: () => void; // Pass the state-clearing part
}> = ({ userRole, setUserRole, handleLogout }) => {
  const navigate = useNavigate();

  const triggerLogout = () => {
    handleLogout(); // Clear state/localStorage
    toast.success("Đăng xuất thành công!"); // Show toast
    navigate("/"); // Navigate home
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Add duration prop (e.g., 3000ms = 3 seconds) */}
      <Toaster position="top-center" richColors duration={1500} />
      <Navbar userRole={userRole} onLogout={triggerLogout} />{" "}
      {/* Pass triggerLogout */}
      <main className="flex-grow-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/seminars" element={<SeminarListPage />} />
          {/* Pass userRole and setUserRole to SeminarDetailPage */}
          <Route
            path="/seminars/:id"
            element={
              <SeminarDetailPage
                userRole={userRole}
                setUserRole={setUserRole} // Pass setUserRole
              />
            }
          />
          <Route
            path="/login"
            element={<LoginPage setUserRole={setUserRole} />}
          />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/signup" element={<RegistrationPage />} />
          <Route path="/about" element={<AboutPage />} />{" "}
          {/* Add About route */}
          <Route path="/contact" element={<ContactPage />} />{" "}
          {/* Add Contact route */}
          <Route path="/privacy" element={<PrivacyPolicyPage />} />{" "}
          {/* Add Privacy Policy route */}
          {/* User Specific Routes */}
          {userRole === "user" && (
            <Route path="/my-enrollments" element={<MyEnrollmentsPage />} />
          )}
          {/* Moderator Specific Routes */}
          {userRole === "moderator" && (
            <>
              <Route path="/moderator" element={<ModeratorDashboardPage />} />
              <Route path="/seminars/new" element={<SeminarFormPage />} />
              <Route path="/seminars/edit/:id" element={<SeminarFormPage />} />
            </>
          )}
          {/* Admin Specific Routes */}
          {userRole === "admin" && (
            <Route path="/admin" element={<AdminDashboardPage />} />
          )}
          {/* Catch-all 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
