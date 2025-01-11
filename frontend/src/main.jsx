import React from "react";
import ReactDOM from "react-dom/client";

console.log("React runtime version:", React.version);

import { BrowserRouter as Router } from "react-router-dom"; // Importing React Router
import App from "./App"; // Importing the App component as the main structure of your app

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
