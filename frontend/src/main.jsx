import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./hooks/authContext"; // Import AuthProvider
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider> {/* Wrap App inside AuthProvider */}
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
