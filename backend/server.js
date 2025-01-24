import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/endPoint.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

// Routes for user-related actions
app.use("/api/users", userRoutes);

// Protected dashboard route
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
