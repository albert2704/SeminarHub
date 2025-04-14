import React, { useState, useMemo, useRef, useEffect } from "react"; // Import useMemo, useRef, useEffect
import { useParams, useNavigate, Link } from "react-router-dom";
import { seminars } from "@/data/seminars"; // Use path alias
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet"; // Import react-leaflet components
import L, { LatLngExpression, LeafletMouseEvent } from "leaflet"; // Import leaflet types

// Helper function to convert DD/MM/YYYY to YYYY-MM-DD
const convertToInputDateFormat = (dateString?: string): string => {
  if (!dateString) return "";
  const parts = dateString.split("/");
  if (parts.length === 3) {
    // parts[0] = day, parts[1] = month, parts[2] = year
    return `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(
      2,
      "0"
    )}`;
  }
  return ""; // Return empty if format is unexpected
};

// Helper function to convert YYYY-MM-DD back to DD/MM/YYYY (optional, for saving)
const convertToDisplayDateFormat = (dateString?: string): string => {
  if (!dateString) return "";
  const parts = dateString.split("-");
  if (parts.length === 3) {
    // parts[0] = year, parts[1] = month, parts[2] = day
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return "";
};

// Fix default Leaflet icon issue in Vite/React
// @ts-expect-error // Use @ts-expect-error instead of @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Component to update map view when coordinates change
const MapUpdater: React.FC<{ position: LatLngExpression }> = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, map.getZoom());
  }, [position, map]);
  return null;
};

const SeminarFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const existingSeminar = isEditing
    ? seminars.find((s) => s.id === id)
    : undefined;

  const [title, setTitle] = useState(existingSeminar?.title || "");
  const [description, setDescription] = useState(
    existingSeminar?.description || ""
  );
  const [presenter, setPresenter] = useState(existingSeminar?.presenter || "");
  const [organization, setOrganization] = useState(
    existingSeminar?.organization || ""
  );
  // Convert date format for the input field when editing
  const [date, setDate] = useState(
    convertToInputDateFormat(existingSeminar?.date)
  );

  // Parse existing time string for editing
  const parseExistingTime = (timeString?: string): [string, string] => {
    if (!timeString) return ["", ""];
    const parts = timeString.split(" - ");
    const start = parts[0] || "";
    // Extract time part before timezone if present (e.g., "16:00 GMT+7" -> "16:00")
    const end = parts[1]?.split(" ")[0] || "";
    return [start, end];
  };

  const [initialStartTime, initialEndTime] = parseExistingTime(
    existingSeminar?.time
  );
  const [startTime, setStartTime] = useState(initialStartTime);
  const [endTime, setEndTime] = useState(initialEndTime);

  const [location, setLocation] = useState(existingSeminar?.location || "");
  const [latitude, setLatitude] = useState<string>(
    existingSeminar?.latitude?.toString() || "21.0285" // Default to Hanoi Latitude
  );
  const [longitude, setLongitude] = useState<string>(
    existingSeminar?.longitude?.toString() || "105.8542" // Default to Hanoi Longitude
  );
  const [topics, setTopics] = useState<string[]>(existingSeminar?.topics || []);

  const allTopics = [
    "Vật lý",
    "Hóa học",
    "Sinh học",
    "Khoa học máy tính",
    "Toán học",
    "Y học",
    "Khoa học môi trường",
    "Tâm lý học",
    "Khoa học thần kinh",
    "Thiên văn học",
    "Đạo đức",
    "Năng lượng",
    "Khí hậu học",
  ];

  const handleTopicToggle = (topic: string) => {
    if (topics.includes(topic)) {
      setTopics(topics.filter((t) => t !== topic));
    } else {
      setTopics([...topics, topic]);
    }
  };

  // --- Map State and Logic ---
  const defaultCenter: LatLngExpression = [21.0285, 105.8542]; // Hanoi center
  const defaultZoom = 13;

  // Function to safely parse lat/lon strings
  const parseCoordinates = (): LatLngExpression => {
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    if (!isNaN(lat) && !isNaN(lon)) {
      return [lat, lon];
    }
    return defaultCenter; // Fallback to default if parsing fails
  };

  const [markerPosition, setMarkerPosition] = useState<LatLngExpression>(
    parseCoordinates()
  );
  const markerRef = useRef<L.Marker>(null);

  // Update marker position state when lat/lon inputs change
  useEffect(() => {
    setMarkerPosition(parseCoordinates());
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latitude, longitude]);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const { lat, lng } = marker.getLatLng();
          setLatitude(lat.toFixed(6)); // Update state with new coordinates
          setLongitude(lng.toFixed(6));
          setMarkerPosition([lat, lng]); // Update internal marker state
        }
      },
    }),
    [setLatitude, setLongitude] // Dependencies
  );
  // --- End Map Logic ---

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct the time string, optionally add timezone back
    const timeString = `${startTime} - ${endTime} GMT+7`; // Example: Re-adding GMT+7

    // Convert date back to DD/MM/YYYY if needed for saving/display consistency
    const displayDate = convertToDisplayDateFormat(date);

    // Convert lat/lon strings back to numbers for saving (or handle potential errors)
    const latNum = latitude ? parseFloat(latitude) : undefined;
    const lonNum = longitude ? parseFloat(longitude) : undefined;

    // In a real app, this would save to a database
    console.log({
      title,
      description,
      presenter,
      organization,
      date: displayDate, // Use the display format for logging/saving if desired
      time: timeString, // Use the constructed time string
      location,
      latitude: latNum, // Save as number
      longitude: lonNum, // Save as number
      topics,
    });

    // Redirect to the moderator dashboard
    navigate("/moderator");
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="d-flex align-items-center mb-4">
            <Link
              to="/moderator"
              className="btn btn-link text-decoration-none px-0 me-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                />
              </svg>
              Quay lại Bảng điều khiển
            </Link>
          </div>
          <div className="card">
            <div className="card-body p-4">
              <h1 className="card-title mb-4">
                {isEditing ? "Chỉnh sửa Hội thảo" : "Tạo Hội thảo Mới"}
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Tiêu đề Hội thảo*
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="presenter" className="form-label">
                      Tên người trình bày*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="presenter"
                      value={presenter}
                      onChange={(e) => setPresenter(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="organization" className="form-label">
                      Tổ chức*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="organization"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Mô tả*
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </div>

                <div className="row mb-3">
                  <div className="col-md-4">
                    <label htmlFor="date" className="form-label">
                      Ngày*
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="date"
                      value={date} // Value is now in YYYY-MM-DD format
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="startTime" className="form-label">
                      Thời gian bắt đầu*
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="startTime"
                      value={startTime} // Value is correctly bound
                      onChange={(e) => setStartTime(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="endTime" className="form-label">
                      Thời gian kết thúc*
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="endTime"
                      value={endTime} // Value is correctly bound
                      onChange={(e) => setEndTime(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-12 mb-3 mb-md-0">
                    {" "}
                    {/* Full width for address */}
                    <label htmlFor="location" className="form-label">
                      Địa điểm (Địa chỉ)*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                      placeholder="Ví dụ: Hội trường ABC, 123 Đường XYZ, Quận 1, TP.HCM"
                    />
                  </div>
                </div>

                {/* --- Map and Coordinate Inputs --- */}
                <div className="row mb-3">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <label htmlFor="latitude" className="form-label">
                      Vĩ độ (Latitude)
                    </label>
                    <input
                      type="number"
                      step="any"
                      className="form-control"
                      id="latitude"
                      value={latitude}
                      onChange={(e) => setLatitude(e.target.value)}
                      placeholder="Ví dụ: 21.0285"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="longitude" className="form-label">
                      Kinh độ (Longitude)
                    </label>
                    <input
                      type="number"
                      step="any"
                      className="form-control"
                      id="longitude"
                      value={longitude}
                      onChange={(e) => setLongitude(e.target.value)}
                      placeholder="Ví dụ: 105.8542"
                    />
                  </div>
                </div>

                {/* Map Container - Corrected Structure */}
                <div className="mb-3">
                  {" "}
                  {/* Removed inline style, height is controlled by MapContainer now */}
                  <label className="form-label">Chọn vị trí trên bản đồ</label>
                  <div style={{ height: "300px", width: "100%" }}>
                    {" "}
                    {/* Added wrapper div for height */}
                    <MapContainer
                      center={markerPosition}
                      zoom={defaultZoom}
                      scrollWheelZoom={false}
                      style={{ height: "100%", width: "100%" }} // Style applied to MapContainer itself
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker
                        draggable={true}
                        eventHandlers={eventHandlers}
                        position={markerPosition}
                        ref={markerRef}
                      ></Marker>
                      <MapUpdater position={markerPosition} />
                    </MapContainer>
                  </div>
                  <div className="form-text">
                    Kéo thả dấu xanh để chọn vị trí chính xác. Tọa độ sẽ tự động
                    cập nhật.
                  </div>
                </div>
                {/* --- End Map and Coordinate Inputs --- */}

                <div className="mb-4">
                  <label className="form-label">Chủ đề*</label>
                  <div className="d-flex flex-wrap gap-2">
                    {allTopics.map((topic) => (
                      <div key={topic} className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`topic-${topic}`}
                          checked={topics.includes(topic)}
                          onChange={() => handleTopicToggle(topic)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`topic-${topic}`}
                        >
                          {topic}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <Link to="/moderator" className="btn btn-outline-secondary">
                    Hủy
                  </Link>
                  <button type="submit" className="btn btn-primary">
                    {isEditing ? "Cập nhật Hội thảo" : "Tạo Hội thảo"}
                  </button>
                </div>
              </form>{" "}
              {/* Ensure this closing tag matches the opening <form> */}
            </div>{" "}
            {/* End card-body */}
          </div>{" "}
          {/* End card */}
        </div>{" "}
        {/* End col-lg-8 */}
      </div>{" "}
      {/* End row */}
    </div> // End container
  );
};

export default SeminarFormPage;
