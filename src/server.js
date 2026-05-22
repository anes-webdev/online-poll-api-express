import express from "express";
import movieRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import watchListRoutes from "./routes/watchListRoutes.js";
import { config } from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";
import "dotenv/config";

config();
connectDB();

const app = express();

// Body parsing middlewares
// In all requests handles json req, without this code we can't access json in request body
app.use(express.json());
// Automatically parse data in html form submission:
app.use(express.urlencoded({ extended: true }));

// API Routes:
app.use("/auth", authRoutes);
app.use("/movies", movieRoutes);
app.use("/watch-list", watchListRoutes);

const port = 5001;
const server = app.listen(port, () => {
  console.log(`Server running on Port ${port}`);
});

process.on("unhandledRejection", async (error) => {
  console.error("Unhandled rejection", error);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

process.on("uncaughtException", async (error) => {
  console.error("Uncaught exception", error);
  await disconnectDB();
  process.exit(1);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});
