import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { seminars } from "@/data/seminars"; // Use path alias
import { Seminar } from "@/types"; // Use path alias
import SeminarCard from "@/components/SeminarCard"; // Use path alias

const MyEnrollmentsPage: React.FC = () => {
  const [enrolledSeminars, setEnrolledSeminars] = useState<Seminar[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate fetching enrolled seminars
  useEffect(() => {
    const fetchEnrollments = async () => {
      setIsLoading(true);
      // In a real app, fetch enrolled seminar IDs for the current user
      // const enrolledIds = await api.getUserEnrollments(userId);
      // const userSeminars = seminars.filter(s => enrolledIds.includes(s.id));

      // --- Simulate ---
      // Let's assume the user is enrolled in the first 2 seminars for demo
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
      const demoEnrolledIds = ["1", "3"]; // Example IDs
      const userSeminars = seminars.filter(
        (
          s: Seminar // Ensure type consistency if needed
        ) => demoEnrolledIds.includes(s.id)
      );
      // --- End Simulate ---

      setEnrolledSeminars(userSeminars);
      setIsLoading(false);
    };

    fetchEnrollments();
  }, []);

  return (
    // Add d-flex flex-column flex-grow-1 to make this container fill space
    <div className="container py-5 d-flex flex-column flex-grow-1">
      <h1 className="mb-4">Hội Thảo Đã Đăng Ký</h1>

      {isLoading ? (
        // Make loading indicator centered vertically too
        <div className="text-center flex-grow-1 d-flex flex-column justify-content-center align-items-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Đang tải danh sách hội thảo...</p>
        </div>
      ) : enrolledSeminars.length > 0 ? (
        <div className="row g-4">
          {enrolledSeminars.map((seminar) => (
            // Add d-flex to make column a flex container for h-100 card
            <div key={seminar.id} className="col-md-6 col-lg-4 d-flex">
              {/* Pass h-100 to SeminarCard */}
              <SeminarCard seminar={seminar} className="h-100" />
            </div>
          ))}
        </div>
      ) : (
        // Make empty state centered vertically too
        <div className="text-center py-5 bg-light rounded flex-grow-1 d-flex flex-column justify-content-center align-items-center">
          <h3 className="text-muted">Bạn chưa đăng ký hội thảo nào.</h3>
          <p className="mb-4">
            Khám phá các hội thảo thú vị và đăng ký tham gia!
          </p>
          <Link to="/seminars" className="btn btn-primary">
            Tìm Hội Thảo
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyEnrollmentsPage;
