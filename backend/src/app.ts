import express, { Application } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import { errorHandler } from "./middleware/errorHandler";
import cors from "cors";

dotenv.config();

export function createApp(): Application {
  const app = express();
  app.use(express.json());

  app.use(
    cors({
      origin: "http://localhost:3000", // your Next frontend
      credentials: true,
    })
  );

  // Routes
  app.use("/api/auth", userRoutes);

  // Health check
  app.get("/healthz", (_req, res) => res.send("ok"));

  // 404 fallback — after routes
  app.use((req, res) => {
    res.status(404).json({ statusCode: 404, message: "Route not found" });
  });

  // Error handler — last
  app.use(errorHandler);

  return app;
}
