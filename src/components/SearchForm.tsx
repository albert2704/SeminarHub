import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { seminars } from "@/data/seminars";
import { Seminar } from "@/types";
interface SearchFormProps {
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
  initialFilter?: string; // Optional initial filter prop
  setFilteredSeminars: (seminars: Seminar[]) => void; // Function to set filtered seminars
  inputSize?: "sm" | "lg"; // Optional size prop
  setIsLoading?: (isLoading: boolean) => void; // Optional loading state setter
}
const parseDate = (dateString: string): Date | null => {
  const parts = dateString.split("/");
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      return new Date(year, month, day);
    }
  }
  return null;
};

const SearchForm: React.FC<SearchFormProps> = ({
  setFilteredSeminars,
  inputSize,
  searchParams,
  setSearchParams,
  initialFilter,
  setIsLoading,
}) => {
  const initialQuery = searchParams.get("query") || "";
  const initialTopic = searchParams.get("topic") || "";
  const initialLocation = searchParams.get("location") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedTopic, setSelectedTopic] = useState(initialTopic);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const topics = useMemo(
    () => [...new Set(seminars.flatMap((s) => s.topics))],
    []
  );
  const locations = useMemo(
    () => [...new Set(seminars.map((s) => s.location))],
    []
  );

  useEffect(() => {
    // Update local state when searchParams change
    const query = searchParams.get("query") || "";
    const topic = searchParams.get("topic") || "";
    const location = searchParams.get("location") || "";

    setSearchQuery(query);
    setSelectedTopic(topic);
    setSelectedLocation(location);
  }, [searchParams]);

  // Update internal state if initialQuery prop changes externally
  const filteredSeminarsMemo = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day for comparison

    return seminars.filter((seminar) => {
      const queryMatch =
        initialQuery === "" ||
        seminar.title.toLowerCase().includes(initialQuery.toLowerCase()) ||
        seminar.presenter.toLowerCase().includes(initialQuery.toLowerCase()) ||
        seminar.description.toLowerCase().includes(initialQuery.toLowerCase());
      const topicMatch =
        initialTopic === "" || seminar.topics.includes(initialTopic);

      const locationMatch =
        initialLocation === "" || seminar.location === initialLocation;

      // Upcoming filter logic
      let upcomingMatch = true; // Default to true if filter is not 'upcoming'
      if (initialFilter === "upcoming") {
        const seminarDate = parseDate(seminar.date);
        upcomingMatch = seminarDate ? seminarDate >= today : false;
      }

      return queryMatch && topicMatch && locationMatch && upcomingMatch; // Add upcomingMatch
    });
  }, [initialQuery, initialTopic, initialLocation, initialFilter]); // Add initialFilter to dependency array

  useEffect(() => {
    setFilteredSeminars(filteredSeminarsMemo); // Update filtered seminars in parent component
  }, [filteredSeminarsMemo, setFilteredSeminars]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params: Record<string, string> = {};
    if (searchQuery) params.query = searchQuery;
    if (selectedTopic) params.topic = selectedTopic;
    if (selectedLocation) params.location = selectedLocation;
    setSearchParams(new URLSearchParams(params));
  };

  useEffect(() => {
    setIsLoading(true); // Start loading

    // Simulate async data fetching/filtering
    const timer = setTimeout(() => {
      let results = seminars;

      // Apply topic filter
      if (initialTopic) {
        results = results.filter((seminar) =>
          seminar.topics.includes(initialTopic)
        );
      }

      // Apply search query filter (title, description, presenter, organization)
      if (initialQuery) {
        results = results.filter(
          (seminar) =>
            seminar.title.toLowerCase().includes(initialQuery.toLowerCase()) ||
            seminar.description
              .toLowerCase()
              .includes(initialQuery.toLowerCase()) ||
            seminar.presenter
              .toLowerCase()
              .includes(initialQuery.toLowerCase()) ||
            seminar.organization
              .toLowerCase()
              .includes(initialQuery.toLowerCase())
        );
      }

      // Apply date filter (exact match for simplicity)
      if (initialFilter) {
        // Assuming dateFilter is in DD/MM/YYYY format like seminar.date
        results = results.filter((seminar) => seminar.date === initialFilter);
      }

      setFilteredSeminars(results);
      setIsLoading(false); // Finish loading
    }, 500); // Simulate 500ms loading time

    return () => clearTimeout(timer); // Cleanup timer on unmount or dependency change
  }, [
    initialQuery,
    initialTopic,
    initialFilter,
    setFilteredSeminars,
    setIsLoading,
  ]);

  const inputClass = `form-control ${
    inputSize ? `form-control-${inputSize}` : ""
  }`;
  const buttonClass = `btn btn-primary ${inputSize ? `btn-${inputSize}` : ""}`;

  return (
    <form onSubmit={handleSearch}>
      {/* Add flex-wrap, remove flex-column */}
      <div className="d-flex flex-wrap flex-lg-row gap-3">
        {/* Search Input with Icon */}
        {/* Use flex-grow-1 for input wrapper */}
        <div
          className="position-relative flex-grow-1"
          style={{ minWidth: "200px" }} // Add min-width style
        >
          <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </span>
          <input
            type="text"
            className="form-control h-100 ps-5 py-2 border-0 shadow-sm"
            placeholder="Tìm kiếm hội thảo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ borderRadius: "0.5rem" }}
          />
        </div>
        {/* Filters */}
        {/* Let selects take natural width, remove min-width */}
        <div className="flex-shrink-0">
          <select
            className="form-select h-100 py-2 shadow-sm"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            style={{ borderRadius: "0.5rem" }}
          >
            <option value="">Tất cả chủ đề</option>
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-shrink-0" style={{ maxWidth: "250px" }}>
          <select
            className="form-select h-100 py-2 shadow-sm"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            style={{ borderRadius: "0.5rem" }}
          >
            <option value="">Tất cả địa điểm</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        {/* Search Button */}
        {/* Make button full width on small screens, natural width on large */}
        <div className="d-grid d-lg-block flex-shrink-0">
          <button
            type="submit"
            className="btn btn-primary h-100 py-2 px-4"
            style={{ borderRadius: "0.5rem" }}
          >
            Tìm kiếm
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
