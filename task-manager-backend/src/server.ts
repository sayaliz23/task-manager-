import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import indexRoutes from "./routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// connect DB
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api", indexRoutes);

// simple root
app.get("/", (_req, res) => {
  res.send({ status: "ok", message: "Task Manager API running" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
