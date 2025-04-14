import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { seminars } from "@/data/seminars"; // Use path alias
import SeminarCard from "@/components/SeminarCard"; // Use path alias

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const featuredSeminars = seminars.slice(0, 6);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/seminars?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <section className="py-5 text-center bg-light">
        <div className="container">
          <span className="badge bg-primary text-white fw-normal mb-3 px-3 py-2 rounded-pill">
            Cộng Đồng Khoa Học
          </span>
          <h1 className="display-3 fw-bold mb-3">Khám Phá Hội Thảo Khoa Học</h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "600px" }}>
            Tham gia cộng đồng khoa học toàn cầu. Khám phá, tham dự và đóng góp
            vào các hội thảo nghiên cứu trên toàn thế giới.
          </p>
          <div className="d-flex justify-content-center gap-2 mt-4">
            <Link to="/seminars" className="btn btn-primary px-4 py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="me-2"
              >
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1H2zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5z" />
              </svg>
              Các Hội Thảo Sắp Tới
            </Link>
            <Link to="/signup" className="btn btn-outline-primary px-4 py-2">
              Đăng Ký Tài Khoản
            </Link>
          </div>

          <div className="d-flex justify-content-center flex-wrap mt-4">
            <Link
              to="/seminars?topic=Vật lý" // Updated topic
              className="btn btn-link text-decoration-none fw-medium"
            >
              Vật Lý
            </Link>
            <Link
              to="/seminars?topic=Hóa học" // Updated topic
              className="btn btn-link text-decoration-none fw-medium"
            >
              Hóa Học
            </Link>
            <Link
              to="/seminars?topic=Sinh học" // Updated topic
              className="btn btn-link text-decoration-none fw-medium"
            >
              Sinh Học
            </Link>
            <Link
              to="/seminars?topic=Khoa học máy tính" // Updated topic
              className="btn btn-link text-decoration-none fw-medium"
            >
              Khoa Học Máy Tính
            </Link>
            <Link
              to="/seminars?topic=Toán học" // Updated topic
              className="btn btn-link text-decoration-none fw-medium"
            >
              Toán Học
            </Link>
            <Link
              to="/seminars?topic=Y học" // Updated topic
              className="btn btn-link text-decoration-none fw-medium"
            >
              Y Học
            </Link>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          {/* Refined Search Bar */}
          <div className="mb-5">
            <form
              onSubmit={handleSearch}
              className="d-flex gap-3 align-items-center" // Changed gap-2 to gap-3
            >
              {/* Input with Icon */}
              <div className="position-relative flex-grow-1">
                <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </span>
                <input
                  type="text"
                  className="form-control form-control-lg py-2 ps-5 pe-4 border-0 shadow-sm" // Added ps-5 for icon space
                  placeholder="Tìm kiếm hội thảo..." // Shortened placeholder
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ borderRadius: "0.5rem" }}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg py-2 px-4"
                style={{ borderRadius: "0.5rem" }}
              >
                Tìm kiếm {/* Shortened button text */}
              </button>
            </form>
          </div>

          <h2 className="mb-4">Hội Thảo Nổi Bật</h2>
          <div className="row g-4">
            {featuredSeminars.map((seminar) => (
              <div key={seminar.id} className="col-md-6 col-lg-6 col-xl-4">
                <SeminarCard seminar={seminar} />
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/seminars" className="btn btn-outline-primary">
              Xem Tất Cả Hội Thảo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
