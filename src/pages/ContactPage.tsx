import React, { useState } from "react";
import { Link } from "react-router-dom";

const ContactPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log("Form submitted:", { name, email, subject, message });
    setIsSubmitted(true);
    // Reset form fields after a delay (optional)
    setTimeout(() => {
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      // Keep isSubmitted true to show the success message
    }, 500);
  };

  // Placeholder coordinates for the fictional address
  const latitude = 20.980998;
  const longitude = 105.787024;
  const mapZoomLevel = 18; // Adjust zoom level as needed

  // Construct OpenStreetMap embed URL with marker and zoom
  const latOffset = 0.001; // Adjust for desired zoom box
  const lonOffset = 0.001; // Adjust for desired zoom box
  const minLon = longitude - lonOffset;
  const minLat = latitude - latOffset;
  const maxLon = longitude + lonOffset;
  const maxLat = latitude + latOffset;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?layer=mapnik&marker=${latitude},${longitude}&bbox=${minLon},${minLat},${maxLon},${maxLat}`;
  const externalMapLink = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=${mapZoomLevel}/${latitude}/${longitude}`;

  return (
    <div className="container py-5">
      {/* Page Header */}
      <div className="text-center mb-5">
        <h1 className="mb-3">Liên Hệ Với Chúng Tôi</h1>
        <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
          Chúng tôi rất mong nhận được phản hồi từ bạn! Vui lòng điền vào biểu
          mẫu bên dưới hoặc liên hệ trực tiếp qua các thông tin bên dưới.
        </p>
      </div>

      {/* Main Content Row */}
      <div className="row g-5">
        {/* Column 1: Contact Form */}
        <div className="col-lg-6">
          {isSubmitted ? (
            <div
              className="alert alert-success text-center d-flex flex-column justify-content-center align-items-center h-100"
              role="alert"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                fill="currentColor"
                className="bi bi-check-circle-fill mb-3 text-success"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </svg>
              <h4 className="alert-heading">Gửi thành công!</h4>
              <p>
                Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.
              </p>
              <div className="mt-3">
                <Link to="/" className="btn btn-sm btn-outline-success">
                  Về Trang chủ
                </Link>
              </div>
            </div>
          ) : (
            <div className="card shadow-sm border-0 h-100 ">
              <div className="card-body p-4 p-md-5">
                <h5 className="card-title mb-4">Gửi tin nhắn cho chúng tôi</h5>
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="name" className="form-label">
                        Tên của bạn*
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">
                        Địa chỉ Email*
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="subject" className="form-label">
                        Chủ đề*
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="message" className="form-label">
                        Nội dung tin nhắn*
                      </label>
                      <textarea
                        className="form-control"
                        id="message"
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <div className="col-12 text-end">
                      {" "}
                      {/* Align button right */}
                      <button type="submit" className="btn btn-primary px-4">
                        {" "}
                        {/* Adjusted padding */}
                        Gửi Tin Nhắn
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Column 2: Contact Details & Map */}
        <div className="col-lg-6 shadow-sm">
          <div className="mb-4">
            <h5 className="mb-3">Thông tin liên hệ</h5>
            <div className="d-flex align-items-start mb-3">
              <div className="flex-shrink-0 me-3 text-primary fs-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  className="bi bi-envelope"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                </svg>
              </div>
              <div>
                <div className="fw-medium">Email</div>
                <a
                  href="mailto:albert04.dev@gmail.com"
                  className="text-decoration-none"
                >
                  albert04.dev@gmail.com
                </a>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <div className="flex-shrink-0 me-3 text-primary fs-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  //   className="bi bi-hgeo-alt"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
              </div>
              <div>
                <div className="fw-medium">Địa chỉ</div>
                <div>123 Đường Khoa Học, Thành phố Tri Thức, Việt Nam</div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-4 py-3">
            <h6 className="mb-3">Vị trí của chúng tôi</h6>
            {/* Add shadow-sm to this div */}
            <div className="ratio ratio-16x9 mb-3 shadow-sm rounded overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={mapSrc}
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                title="Vị trí SeminarHub"
              ></iframe>
            </div>
            <div className="text-center">
              <a
                href={externalMapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline-primary"
              >
                Mở trong OpenStreetMap
              </a>
            </div>
          </div>
          {/* End Map Section */}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
