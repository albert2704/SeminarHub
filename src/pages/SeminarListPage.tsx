import React, { useState, useEffect, useMemo } from "react"; // Import useEffect
import { useSearchParams, Link } from "react-router-dom";
import { seminars } from "@/data/seminars";
import SeminarCard from "@/components/SeminarCard";
import { Seminar } from "@/types";
import SearchForm from "@/components/SearchForm";
import Pagination from "@/components/Pagination";
import { parseDateString } from "@/utils/dateUtils";
const ITEMS_PER_PAGE = 6; // Define how many seminars per page

const SeminarListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilter = searchParams.get("filter") || ""; // Get filter param
  // State for current page
  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [filteredSeminars, setFilteredSeminars] = useState<Seminar[]>([]); // State for filtered results

  // Pagination Calculations
  const totalPages = Math.ceil(filteredSeminars.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedSeminars = filteredSeminars.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo(0, 0); // Scroll to top on page change
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const query = searchParams.get("query") || "";
    const topic = searchParams.get("topic") || "";
    const location = searchParams.get("location") || "";
    const filter = searchParams.get("filter") || ""; // 'upcoming', 'past', or ''

    // Simulate async filtering if needed, or just filter directly
    const timer = setTimeout(() => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // For date comparison

      const results = seminars.filter((seminar) => {
        // Topic Filter
        if (topic && !seminar.topics.includes(topic)) {
          return false;
        }
        // Location Filter
        if (location && seminar.location !== location) {
          return false;
        }
        // Search Query Filter
        const lowerCaseQuery = query.toLowerCase();
        if (
          lowerCaseQuery &&
          !(
            seminar.title.toLowerCase().includes(lowerCaseQuery) ||
            seminar.presenter.toLowerCase().includes(lowerCaseQuery) ||
            seminar.organization.toLowerCase().includes(lowerCaseQuery) ||
            seminar.description.toLowerCase().includes(lowerCaseQuery)
          )
        ) {
          return false;
        }

        // Date Filter (Handles 'upcoming' and 'past')
        const seminarDate = parseDateString(seminar.date);
        if (filter === "upcoming" && (!seminarDate || seminarDate < today)) {
          return false;
        }
        if (filter === "past" && (!seminarDate || seminarDate >= today)) {
          return false;
        }

        return true; // Include seminar if all checks pass
      });

      setFilteredSeminars(results);
      setCurrentPage(1); // Reset to page 1 when filters change
      setIsLoading(false);
    }, 300); // Simulate delay

    return () => clearTimeout(timer); // Cleanup timeout
  }, [searchParams]);

  return (
    <div className="container py-5">
      {/* Conditionally show title based on filter */}
      <h1 className="mb-4">
        {initialFilter === "upcoming" ? "Hội Thảo Sắp Tới" : "Tìm Hội Thảo"}
      </h1>

      {/* Refined Search and Filter Bar */}
      {/* Only show full filters if not specifically filtering upcoming */}
      {initialFilter !== "upcoming" && (
        <div className="mb-5">
          <SearchForm
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            initialFilter={initialFilter}
            setFilteredSeminars={setFilteredSeminars}
            setIsLoading={setIsLoading}
          />
        </div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="text-center py-5">
          {" "}
          {/* Wrap spinner and text in this div */}
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </div>
          <p className="mt-2 text-muted">Đang tải danh sách hội thảo...</p>
        </div> // Correctly close the loading div
      ) : /* Seminar List or No Results */
      paginatedSeminars.length > 0 ? (
        <>
          <div className="row g-4">
            {paginatedSeminars.map((seminar) => (
              <div key={seminar.id} className="col-md-6 col-xl-4">
                <SeminarCard seminar={seminar} />
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      ) : (
        <div className="text-center py-5 bg-light rounded">
          {" "}
          {/* Wrap "No Results" content in this div */}
          <h3 className="text-muted">Không tìm thấy hội thảo phù hợp.</h3>
          <p className="mb-4">Hãy thử điều chỉnh bộ lọc hoặc quay lại sau.</p>
          <Link to="/seminars" className="btn btn-outline-primary">
            Xóa bộ lọc
          </Link>
        </div> // Correctly close the "No Results" div
      )}
    </div>
  );
};

export default SeminarListPage;
