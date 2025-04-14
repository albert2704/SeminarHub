import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Import Bootstrap CSS and JS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Import Leaflet CSS
import "leaflet/dist/leaflet.css";

// Import custom CSS
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
