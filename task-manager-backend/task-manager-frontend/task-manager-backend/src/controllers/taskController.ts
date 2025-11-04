import { Request, Response } from "express";
import Task from "../models/Task";
import { AuthRequest } from "../middleware/authMiddleware";

// 🟢 CREATE a Task
export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description } = req.body;

    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const task = await Task.create({
      title,
      description,
      userId: req.user.id,
    });

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error("Create Task Error:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
};

// 🟡 GET All Tasks for Logged-in User
export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (error) {
    console.error("Get Tasks Error:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

// 🟠 UPDATE a Task
export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.user?.id },
      { title, description, status },
      { new: true }
    );

    if (!task) return res.status(404).json({ error: "Task not found" });

    res.json({ message: "Task updated successfully", task });
  } catch (error) {
    console.error("Update Task Error:", error);
    res.status(500).json({ error: "Failed to update task" });
  }
};

// 🔴 DELETE a Task
export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({ _id: id, userId: req.user?.id });

    if (!task) return res.status(404).json({ error: "Task not found" });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete Task Error:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
};
