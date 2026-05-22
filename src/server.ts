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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
