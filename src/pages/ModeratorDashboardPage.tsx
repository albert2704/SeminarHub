import React, { useState, useEffect, useMemo } from "react"; // Import useMemo
import { Link, useSearchParams } from "react-router-dom";
import { seminars } from "@/data/seminars"; // Use path alias
import SeminarCard from "@/components/SeminarCard"; // Use path alias
import Pagination from "@/components/Pagination"; // Import Pagination component
import SearchForm from "@/components/SearchForm"; // Import SearchForm
import { Seminar } from "@/types"; // Import Seminar type

const ITEMS_PER_PAGE = 6; // Define how many seminars per page

const ModeratorDashboardPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilter = searchParams.get("filter") || ""; // Get filter param
  // State for current page

  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [filteredSeminars, setFilteredSeminars] = useState<Seminar[]>([]); // State for filtered results

  // Pagination Calculations
  const [activeTab, setActiveTab] = useState<"manage" | "review">("manage");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [seminarToDelete, setSeminarToDelete] = useState<string | null>(null);
  // Remove local searchQuery state
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [submittedQuery, setSubmittedQuery] = useState(""); // State for submitted query

  // Filter seminars based on the submitted search query
  // Calculate pagination details
  const totalPages = Math.ceil(filteredSeminars.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedSeminars = filteredSeminars.slice(startIndex, endIndex);

  // Reset to page 1 when submitted query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [submittedQuery]);

  // Effect to manage body class and cleanup
  useEffect(() => {
    if (showDeleteModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    // Cleanup function to remove class if component unmounts while modal is open
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [showDeleteModal]); // Run effect when showDeleteModal changes

  const handleDeleteClick = (id: string) => {
    setSeminarToDelete(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    console.log(`Xóa hội thảo với id: ${seminarToDelete}`);
    // Trong ứng dụng thực tế, đây sẽ thực hiện API call để xóa hội thảo

    setShowDeleteModal(false);
    setSeminarToDelete(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Scroll to top when page changes
  };

  // Handle search submission from SearchForm component
  const handleSearchSubmit = (query: string) => {
    setSubmittedQuery(query);
    // No need to update URL params here unless desired for bookmarking
    setCurrentPage(1); // Reset page on new search
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
        <h1 className="mb-0">Bảng Điều Khiển Quản Trị</h1>
        <Link to="/seminars/new" className="btn btn-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="me-1"
          >
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          Thêm Hội Thảo Mới
        </Link>
      </div>

      {/* Search Form Component */}
      <div className="mb-4">
        <SearchForm
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          initialFilter={initialFilter}
          setFilteredSeminars={setFilteredSeminars}
          setIsLoading={setIsLoading}
          inputSize="lg" // Apply large size consistent with previous style
        />
      </div>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "manage" ? "active" : ""}`}
            onClick={() => setActiveTab("manage")}
          >
            Quản Lý Hội Thảo
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "review" ? "active" : ""}`}
            onClick={() => setActiveTab("review")}
          >
            Duyệt Đăng Ký
          </button>
        </li>
      </ul>

      {activeTab === "manage" && (
        <>
          {" "}
          {/* Wrap content in Fragment */}
          {isLoading ? (
            <div className="text-center py-5">
              {" "}
              {/* Wrap spinner and text in this div */}
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Đang tải...</span>
              </div>
              <p className="mt-2 text-muted">Đang tải danh sách hội thảo...</p>
            </div>
          ) : paginatedSeminars.length > 0 ? (
            <>
              <div className="row g-4">
                {paginatedSeminars.map(
                  (
                    seminar: Seminar // Add type annotation
                  ) => (
                    <div
                      key={seminar.id}
                      className="col-md-6 col-lg-6 col-xl-4"
                    >
                      <SeminarCard
                        seminar={seminar}
                        showEditButton
                        onDeleteClick={handleDeleteClick}
                      />
                    </div>
                  )
                )}
              </div>
              {totalPages > 1 && (
                <div className="mt-4">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-5">
              <p className="text-muted">
                {submittedQuery // Show message based on submitted query
                  ? "Không tìm thấy hội thảo nào phù hợp với tìm kiếm của bạn."
                  : "Không có hội thảo nào để hiển thị."}
              </p>
            </div>
          )}
          {/* Pagination Controls */}
        </>
      )}

      {activeTab === "review" && (
        <div className="text-center py-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            fill="#6c757d"
            viewBox="0 0 16 16"
            className="mb-3"
          >
            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
          </svg>
          <h3>Không có đăng ký đang chờ duyệt</h3>
          <p className="text-muted">
            Các đăng ký hội thảo mới sẽ xuất hiện ở đây để bạn xem xét
          </p>
        </div>
      )}

      {/* Modal xác nhận xóa */}
      {showDeleteModal && (
        <>
          {" "}
          {/* Use Fragment to wrap modal and backdrop */}
          <div
            className="modal fade show"
            tabIndex={-1}
            style={{ display: "block" }} // Add display: block back
            aria-modal="true" // Add aria-modal
            role="dialog" // Add role
          >
            {/* Add modal-dialog-centered here */}
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Xác nhận xóa</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowDeleteModal(false)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    Bạn có chắc chắn muốn xóa hội thảo này? Hành động này không
                    thể hoàn tác.
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Hủy
                  </button>
                  {/* Correct the Delete button structure */}
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleConfirmDelete}
                  >
                    Xóa
                  </button>
                  {/* Removed the extra closing tag and misplaced text */}
                </div>
              </div>
            </div>
          </div>
          {/* Conditionally render the backdrop */}
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
};

export default ModeratorDashboardPage;
