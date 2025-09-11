import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { listPatients, getPatient, createPatient, updatePatient } from "./routes/patients";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Patients API (mock)
  app.get("/api/patients", listPatients);
  app.get("/api/patients/:id", getPatient);
  app.post("/api/patients", createPatient);
  app.put("/api/patients/:id", updatePatient);

  return app;
}
