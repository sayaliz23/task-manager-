import { Router } from "express";
import authRoutes from "./authRoutes";
import taskRoutes from "./taskRoutes";

const router = Router();

// Root route (API check)
router.get("/", (_req, res) => {
  res.json({ message: "Welcome to Task Manager API" });
});

// Authentication routes
router.use("/auth", authRoutes);

// Task routes (protected with JWT)
router.use("/tasks", taskRoutes);

export default router;
