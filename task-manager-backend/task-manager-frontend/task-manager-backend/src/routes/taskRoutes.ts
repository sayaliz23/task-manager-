import { Router } from "express";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/taskController";
import { verifyToken } from "../middleware/authMiddleware";

const router = Router();

router.post("/", verifyToken, createTask);
router.get("/", verifyToken, getTasks);
router.put("/:id", verifyToken, updateTask);
router.delete("/:id", verifyToken, deleteTask);

export default router;
