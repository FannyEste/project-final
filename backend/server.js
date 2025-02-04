import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/endPoint.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import dotenv from "dotenv";
import discussionsRoutes from "./routes/discussionRoutes.js";

dotenv.config();

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

app.use(
  cors({
    origin: "https://hormonalheaven.netlify.app", // Remove localhost
    credentials: true, // Allow authentication cookies or headers
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);
app.use(express.json());

// Routes for user-related actions
app.use("/api/users", userRoutes);

// Protected dashboard route
app.use("/api/dashboard", dashboardRoutes);

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Add the new discussions route
app.use("/api/discussions", discussionsRoutes);

app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
