import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) {
    return null; // Don't render pagination if there's only one page or less
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Basic pagination - show first, current, last, and ellipses if needed
  // More complex logic can be added for more page numbers
  const pageNumbers = [];
  const maxPagesToShow = 5; // Adjust as needed

  if (totalPages <= maxPagesToShow) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    pageNumbers.push(1); // Always show first page
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) {
      endPage = 4;
    }
    if (currentPage >= totalPages - 2) {
      startPage = totalPages - 3;
    }

    if (startPage > 2) {
      pageNumbers.push("..."); // Ellipsis before current range
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages - 1) {
      pageNumbers.push("..."); // Ellipsis after current range
    }

    pageNumbers.push(totalPages); // Always show last page
  }

  const renderPaginationItems = () => {
    const items = [];
    const pageNeighbours = 1; // How many pages to show around the current page

    // Previous Button
    items.push(
      <li
        key="prev"
        className={`page-item mx-1 ${currentPage === 1 ? "disabled" : ""}`} // Added mx-1
      >
        <button
          className="page-link rounded" // Added rounded
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous"
        >
          &laquo;
        </button>
      </li>
    );

    // Determine page numbers to display
    const startPage = Math.max(1, currentPage - pageNeighbours);
    const endPage = Math.min(totalPages, currentPage + pageNeighbours);
    const pages = [];

    // Always add page 1
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("..."); // Ellipsis if gap after page 1
      }
    }

    // Add pages around current page
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("..."); // Ellipsis if gap before last page
      }
      pages.push(totalPages);
    }

    // Render page number buttons and ellipsis
    pages.forEach((page, index) => {
      if (page === "...") {
        items.push(
          <li key={`ellipsis-${index}`} className="page-item mx-1 disabled">
            <span className="page-link rounded">...</span>
          </li>
        );
      } else {
        items.push(
          <li
            key={page}
            className={`page-item mx-1 ${currentPage === page ? "active" : ""}`} // Added mx-1
          >
            <button
              className="page-link rounded" // Added rounded
              onClick={() => onPageChange(page as number)}
            >
              {page}
            </button>
          </li>
        );
      }
    });

    // Next Button
    items.push(
      <li
        key="next"
        className={`page-item mx-1 ${
          currentPage === totalPages ? "disabled" : ""
        }`} // Added mx-1
      >
        <button
          className="page-link rounded" // Added rounded
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next"
        >
          &raquo;
        </button>
      </li>
    );
    return items;
  };

  return (
    <nav
      aria-label="Seminar pagination"
      className="mt-5 d-flex justify-content-center"
    >
      {" "}
      {/* Correctly open the nav tag */}
      <ul className="pagination mb-0">{renderPaginationItems()}</ul>
    </nav> // Correctly close the nav tag
  );
};

export default Pagination;
