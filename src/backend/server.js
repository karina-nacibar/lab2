import express from "express";
import cors from "cors";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  updateStatus,
  deleteTask,
  getSummary
} from "./tasks.js";

const app = express();
const PORT = 3000;

app.use(cors()); // permite que tu Vue (otro puerto) consuma la API
app.use(express.json());

// rutas
app.get("/tasks", getTasks);
app.get("/tasks/summary", getSummary);
app.get("/tasks/:id", getTaskById);
app.post("/tasks", createTask);
app.put("/tasks/:id", updateTask);
app.patch("/tasks/:id/status", updateStatus);
app.delete("/tasks/:id", deleteTask);

app.listen(PORT, () => console.log(`Backend corriendo en http://localhost:${PORT}`));