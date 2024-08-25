import express from "express";
import { TaskService } from "../services/taskService";

const router = express.Router();
const taskService = new TaskService();

router.post("/", async (req, res) => {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: "Error creating task", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const tasks = await taskService.getTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const task = await taskService.getTask (req.params.id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching task", error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error updating task", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const task = await taskService.deleteTask(req.params.id);
    if (task) {
      res.json({ message: "Task deleted successfully" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
});

export default router;
