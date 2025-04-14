import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { seminars } from "@/data/seminars"; // Use path alias
import { Carousel } from "bootstrap"; // Import Bootstrap Carousel JS
import { calculateTimeFrame } from "@/utils/dateUtils"; // Import the utility function
import LoginModal from "@/components/LoginModal"; // Import the LoginModal
import { toast } from "sonner"; // Import toast

// Define props interface to accept userRole and setUserRole
interface SeminarDetailPageProps {
  userRole: "user" | "moderator" | "admin" | null;
  setUserRole: (role: "user" | "moderator" | "admin") => void; // Add setUserRole
}

const SeminarDetailPage: React.FC<SeminarDetailPageProps> = ({
  userRole,
  setUserRole, // Destructure setUserRole
}) => {
  const { id } = useParams<{ id: string }>();
  const seminar = seminars.find((s) => s.id === id);

  const [copyButtonText, setCopyButtonText] = useState("Sao chép liên kết");
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollButtonText, setEnrollButtonText] = useState("Đăng ký tham gia");
  const [showLoginModal, setShowLoginModal] = useState(false); // State for login modal

  // Simulate checking enrollment status (replace with actual logic)
  useEffect(() => {
    // In a real app, check if the user is enrolled in seminar with 'id'
    const checkEnrollment = async () => {
      // Example: const enrolled = await api.isUserEnrolled(userId, id);
      // setIsEnrolled(enrolled);
      // setEnrollButtonText(enrolled ? "Đã đăng ký" : "Đăng ký tham gia");
    };
    if (userRole === "user") {
      checkEnrollment();
    }
  }, [id, userRole]);

  // Effect to manually initialize the carousel
  useEffect(() => {
    if (seminar && seminar.images && seminar.images.length > 0) {
      const carouselElement = document.getElementById(
        `seminarCarousel-${seminar.id}`
      );
      if (carouselElement) {
        // Create a new Carousel instance and optionally configure it
        const carouselInstance = new Carousel(carouselElement, {
          interval: 4000, // Set slide interval in ms
          ride: "carousel", // Explicitly tell it to start riding
        });

        // Optional: Cleanup function to dispose of the carousel instance
        // when the component unmounts to prevent memory leaks
        return () => {
          carouselInstance.dispose();
        };
      }
    }
  }, [seminar]); // Re-run effect if seminar data changes

  if (!seminar) {
    return (
      <div className="container py-5 text-center">
        <h2>Không tìm thấy hội thảo</h2>
        <p>Hội thảo bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        <Link to="/seminars" className="btn btn-primary mt-3">
          Quay lại danh sách hội thảo
        </Link>
      </div>
    );
  }

  // Construct OpenStreetMap embed URL with optional marker
  const mapQuery = encodeURIComponent(seminar.location);
  // Ensure base URL is correct and includes the protocol
  let mapSrc = `https://www.openstreetmap.org/export/embed.html?layer=mapnik`;
  let externalMapLink = `https://www.openstreetmap.org/search?query=${mapQuery}`;

  if (seminar.latitude !== undefined && seminar.longitude !== undefined) {
    // Add marker coordinates
    mapSrc += `&marker=${seminar.latitude},${seminar.longitude}`;

    // Define even smaller offsets for a tighter bounding box (higher zoom)
    const latOffset = 0.001; // Further decreased latitude range
    const lonOffset = 0.002; // Further decreased longitude range

    // Calculate the bounding box coordinates
    const minLon = seminar.longitude - lonOffset;
    const minLat = seminar.latitude - latOffset;
    const maxLon = seminar.longitude + lonOffset;
    const maxLat = seminar.latitude + latOffset;

    // Add the bounding box to the map source URL
    mapSrc += `&bbox=${minLon},${minLat},${maxLon},${maxLat}`;

    // Update external link to point to coordinates (adjust zoom level '18' or higher as needed)
    externalMapLink = `https://www.openstreetmap.org/?mlat=${seminar.latitude}&mlon=${seminar.longitude}#map=18/${seminar.latitude}/${seminar.longitude}`; // Increased zoom to 18
  } else {
    // Fallback if no coordinates - use query only (less precise)
    // For query-based search, the embed might not show a marker reliably.
    // Consider not embedding the map if coordinates are missing, or just showing a general area.
    // mapSrc += `&query=${mapQuery}`; // Commenting out query for embed as it's less reliable for markers
    console.warn(
      "Seminar location coordinates missing, map may not show specific point."
    );
  }

  // Log the final map source URL for debugging
  console.log("Generated Map Embed SRC:", mapSrc);

  // Function to handle copying the link
  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(
      () => {
        setCopyButtonText("Đã sao chép!"); // Update button text on success
        setTimeout(() => setCopyButtonText("Sao chép liên kết"), 2000); // Reset after 2 seconds
      },
      (err) => {
        console.error("Failed to copy link: ", err);
        setCopyButtonText("Lỗi sao chép"); // Indicate error
        setTimeout(() => setCopyButtonText("Sao chép liên kết"), 2000); // Reset after 2 seconds
      }
    );
  };

  // Function to handle enrollment
  const handleEnroll = () => {
    if (!seminar) return;

    // Simulate API call
    console.log(
      `User attempting to ${
        isEnrolled ? "unenroll from" : "enroll in"
      } seminar: ${seminar.title} (ID: ${id})`
    );

    // Toggle enrollment state and update button text
    const newState = !isEnrolled;
    setIsEnrolled(newState);
    setEnrollButtonText(newState ? "Hủy đăng ký" : "Đăng ký tham gia");

    // Show toast notification
    if (newState) {
      toast.success(`Đã đăng ký thành công hội thảo "${seminar.title}"!`);
    } else {
      toast.info(`Đã hủy đăng ký hội thảo "${seminar.title}".`);
    }

    // In a real app:
    // try {
    //   if (isEnrolled) { // Check previous state before toggle
    //     await api.unenrollSeminar(userId, id);
    //     setIsEnrolled(false);
    //     setEnrollButtonText("Đăng ký tham gia");
    //     toast.info(`Đã hủy đăng ký hội thảo "${seminar.title}".`);
    //   } else {
    //     await api.enrollSeminar(userId, id);
    //     setIsEnrolled(true);
    //     setEnrollButtonText("Đã đăng ký"); // Or "Hủy đăng ký" if you prefer immediate toggle feedback
    //     toast.success(`Đã đăng ký thành công hội thảo "${seminar.title}"!`);
    //   }
    // } catch (error) {
    //   console.error("Enrollment failed:", error);
    //   toast.error("Thao tác đăng ký thất bại. Vui lòng thử lại.");
    //   // Revert state if API call failed
    //   setIsEnrolled(isEnrolled); // Revert to original state
    //   setEnrollButtonText(isEnrolled ? "Hủy đăng ký" : "Đăng ký tham gia");
    // }
  };

  // Function to handle opening the login modal
  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  // Function to handle closing the login modal
  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <>
      {" "}
      {/* Wrap in fragment to allow modal sibling */}
      <div className="container py-4">
        <Link
          to="/seminars"
          className="d-inline-flex align-items-center text-decoration-none mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="me-1"
          >
            <path
              fillRule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>
          Quay lại danh sách hội thảo
        </Link>
        <div className="d-flex flex-wrap gap-2 mb-2">
          {seminar.topics.map((topic) => (
            <span key={topic} className="topic-tag">
              {topic}
            </span>
          ))}
        </div>
        <h1 className="mb-1">{seminar.title}</h1>
        <p className="text-muted mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="me-1"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c0-.001-.002-.246-.73-.993C11.824 10.354 10.144 9 8 9c-2.144 0-3.824 1.354-4.274 2.003C3.002 11.75 3 11.995 3 11.996v.008h12v-.008z" />
          </svg>
          {seminar.presenter}, {seminar.organization}
        </p>
        <div className="row mb-4">
          {" "}
          {/* Added mb-4 for spacing */}
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                {/* Replace static image placeholder with Carousel */}
                {seminar.images && seminar.images.length > 0 ? (
                  <div
                    id={`seminarCarousel-${seminar.id}`}
                    className="carousel slide mb-4"
                    // data-bs-ride attribute can be removed now as we initialize manually
                  >
                    <div className="carousel-indicators">
                      {seminar.images.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          data-bs-target={`#seminarCarousel-${seminar.id}`}
                          data-bs-slide-to={index}
                          className={index === 0 ? "active" : ""}
                          aria-current={index === 0 ? "true" : "false"}
                          aria-label={`Slide ${index + 1}`}
                        ></button>
                      ))}
                    </div>
                    <div className="carousel-inner rounded">
                      {" "}
                      {/* Added rounded */}
                      {seminar.images.map((image, index) => (
                        <div
                          key={index}
                          className={`carousel-item ${
                            index === 0 ? "active" : ""
                          }`}
                        >
                          <img
                            src={image}
                            className="d-block w-100 seminar-detail-carousel-img" // Added seminar-detail-carousel-img class
                            alt={`${seminar.title} - Image ${index + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target={`#seminarCarousel-${seminar.id}`}
                      data-bs-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target={`#seminarCarousel-${seminar.id}`}
                      data-bs-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                ) : (
                  // Optional: Fallback if no images exist
                  <div className="text-center bg-light rounded py-5 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="64"
                      height="64"
                      fill="#6c757d"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                      <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" />
                    </svg>
                    <p className="mt-2 text-muted small">Không có hình ảnh</p>
                  </div>
                )}
                <ul
                  className="nav nav-tabs mb-4"
                  id="seminarTabs"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="description-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#description"
                      type="button"
                      role="tab"
                      aria-controls="description"
                      aria-selected="true"
                    >
                      Mô tả
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="agenda-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#agenda"
                      type="button"
                      role="tab"
                      aria-controls="agenda"
                      aria-selected="false"
                    >
                      Chương trình
                    </button>
                  </li>
                  {/* Add Map Tab */}
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="map-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#map"
                      type="button"
                      role="tab"
                      aria-controls="map"
                      aria-selected="false"
                    >
                      Bản đồ
                    </button>
                  </li>
                </ul>
                <div className="tab-content" id="seminarTabsContent">
                  <div
                    className="tab-pane fade show active"
                    id="description"
                    role="tabpanel"
                    aria-labelledby="description-tab"
                  >
                    <p className="mb-4">{seminar.description}</p>

                    <p className="mb-0">
                      Bài thuyết trình sẽ bao gồm các khuôn khổ quy định hiện
                      tại, các mối quan tâm về cải thiện di truyền và điều trị,
                      cũng như các vấn đề về tiếp cận và công bằng. Người tham
                      dự sẽ có cơ hội tham gia vào một cuộc thảo luận về cách xã
                      hội nên tiếp cận những khả năng mới mạnh mẽ này.
                    </p>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="agenda"
                    role="tabpanel"
                    aria-labelledby="agenda-tab"
                  >
                    {seminar.agenda ? (
                      // Use agenda-list class
                      <ul className="list-unstyled agenda-list">
                        {seminar.agenda.map((item, index) => (
                          // Use agenda-item class
                          <li key={index} className="agenda-item">
                            {" "}
                            {/* Removed pb-3, handled by CSS */}
                            {/* Ensure agenda-time class is used */}
                            <span className="agenda-time">{item.time}</span>
                            <span>{item.description}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted">
                        Không có chương trình cho hội thảo này.
                      </p>
                    )}
                  </div>

                  {/* Add Map Tab Pane */}
                  <div
                    className="tab-pane fade"
                    id="map"
                    role="tabpanel"
                    aria-labelledby="map-tab"
                  >
                    {seminar.latitude !== undefined &&
                    seminar.longitude !== undefined ? (
                      <>
                        <div className="ratio ratio-16x9 mb-3">
                          {" "}
                          {/* Add margin bottom */}
                          <iframe
                            width="100%"
                            height="100%"
                            src={mapSrc}
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            title={`Map of ${seminar.location}`}
                          ></iframe>
                        </div>
                        <div className="text-center">
                          {" "}
                          {/* Center the link */}
                          <a
                            href={externalMapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-outline-primary"
                          >
                            Mở trong OpenStreetMap
                          </a>
                        </div>
                      </>
                    ) : (
                      <p className="text-muted text-center py-3">
                        Không có dữ liệu vị trí để hiển thị bản đồ.
                      </p>
                    )}
                  </div>
                </div>{" "}
                {/* End Tab Content */}
              </div>{" "}
              {/* End Card Body */}
            </div>{" "}
            {/* End Main Content Card */}
          </div>{" "}
          {/* End col-lg-8 */}
          <div className="col-lg-4">
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h5 className="card-title mb-4">Chi Tiết Hội Thảo</h5>

                <div className="d-flex align-items-center mb-3">
                  <div className="me-3 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-muted small">Ngày</div>
                    <div>{seminar.date}</div>
                    {/* Use the calculated timeframe */}
                    <div className="small text-muted">
                      {calculateTimeFrame(seminar.date)}
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center mb-3">
                  <div className="me-3 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-muted small">Thời gian</div>
                    <div>{seminar.time}</div>
                  </div>
                </div>

                <div className="d-flex align-items-center mb-4">
                  <div className="me-3 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-muted small">Địa điểm</div>
                    <div>{seminar.location}</div>
                  </div>
                </div>

                {/* Enrollment Number */}
                <div className="d-flex align-items-center mb-4">
                  <div className="me-3 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                      <path
                        fillRule="evenodd"
                        d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
                      />
                      <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-muted small">Số người đăng ký</div>
                    <div>{seminar.enrollmentNumber}</div>
                  </div>
                </div>

                <div className="text-center mb-3">
                  {/* Conditional Button Rendering */}
                  {userRole === "user" ? (
                    <button
                      className={`btn ${
                        isEnrolled ? "btn-outline-secondary" : "btn-primary"
                      } w-100`}
                      onClick={handleEnroll}
                      disabled={!seminar} // Disable if seminar data isn't loaded
                    >
                      {enrollButtonText}
                    </button>
                  ) : userRole === "moderator" || userRole === "admin" ? (
                    <p className="text-muted small mb-0">
                      Quản trị viên/Kiểm duyệt viên không thể đăng ký.
                    </p>
                  ) : (
                    <>
                      <p className="text-muted small mb-3">
                        Đăng nhập để đăng ký tham gia hội thảo này
                      </p>
                      {/* Change Link to button and add onClick */}
                      <button
                        onClick={handleLoginClick}
                        className="btn btn-primary w-100"
                      >
                        Đăng Nhập
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* ...existing share card... */}
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title mb-3">Chia sẻ hội thảo này</h5>
                <button
                  className="btn btn-outline-primary w-100"
                  onClick={handleCopyLink} // Add onClick handler
                >
                  {copyButtonText} {/* Use state for button text */}
                </button>
              </div>
            </div>
          </div>
        </div>{" "}
        {/* End of main content/sidebar row */}
      </div>{" "}
      {/* Login Modal */}
      <LoginModal
        show={showLoginModal}
        onClose={handleCloseLoginModal}
        setUserRole={setUserRole}
      />
    </>
  );
};

export default SeminarDetailPage;
