import React from "react";
import { Link } from "react-router-dom";
import { Seminar } from "@/types"; // Use path alias
import { calculateTimeFrame } from "@/utils/dateUtils"; // Import the utility function

interface SeminarCardProps {
  seminar: Seminar;
  showEditButton?: boolean;
  onDeleteClick?: (id: string) => void;
  className?: string; // Add className prop
}

const SeminarCard: React.FC<SeminarCardProps> = ({
  seminar,
  showEditButton = false,
  onDeleteClick,
  className = "", // Default to empty string
}) => {
  const timeFrame = calculateTimeFrame(seminar.date); // Calculate timeframe

  return (
    // Add className to the outer card div and overflow-hidden
    <div
      className={`card h-100 shadow-sm border-0 overflow-hidden ${className}`}
    >
      {/* Use first image or a placeholder */}
      <Link to={`/seminars/${seminar.id}`} className="text-decoration-none">
        <img
          src={
            seminar.images?.[0] ||
            "https://via.placeholder.com/400x200.png?text=Seminar"
          } // Placeholder if no image
          className="card-img-top seminar-card-img" // Added seminar-card-img class
          alt={seminar.title}
        />
      </Link>
      {/* Make card-body a flex column */}
      <div className="card-body d-flex flex-column">
        <div className="d-flex flex-wrap gap-1 mb-2">
          {seminar.topics.slice(0, 3).map(
            (
              topic // Limit topics shown
            ) => (
              <span key={topic} className="topic-tag small">
                {" "}
                {/* Make tag smaller */}
                {topic}
              </span>
            )
          )}
        </div>
        <h5 className="card-title mb-1">
          <Link
            to={`/seminars/${seminar.id}`}
            className="text-dark text-decoration-none"
          >
            {seminar.title}
          </Link>
        </h5>
        <p className="card-text text-muted small mb-2">
          {" "}
          {/* Smaller text */}
          {seminar.presenter}, {seminar.organization}
        </p>
        {/* Display Enrollment Number */}
        <p className="card-text text-muted small mb-3">
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
          {seminar.enrollmentNumber} người đã đăng ký
        </p>

        {/* Use mt-auto to push the following div to the bottom */}
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <div>
            <p className="mb-0 small">
              {" "}
              {/* Smaller text */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="me-1"
              >
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
              </svg>
              {seminar.date}
            </p>
            {/* Display timeframe */}
            <p className="mb-0 small text-muted">{timeFrame}</p>
          </div>
          {/* Edit/Delete Buttons (Conditional) */}
          {showEditButton && onDeleteClick && (
            <div className="d-flex gap-1">
              <Link
                to={`/seminars/edit/${seminar.id}`}
                className="btn btn-outline-secondary card-action-btn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  {/* ... edit icon path ... */}
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fillRule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />
                </svg>
              </Link>
              <button
                onClick={() => onDeleteClick(seminar.id)}
                className="btn btn-outline-danger card-action-btn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  {/* ... delete icon path ... */}
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                  <path
                    fillRule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeminarCard;
