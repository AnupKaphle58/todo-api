// Packages
import express from "express";

// Controllers
import { taskController } from "../controller/index.js";

// Middlewares
import protect from "../middleware/protect.js";

const { getAllTask, createTask, updateTask } = taskController;

const router = express.Router();

router.get("/", getAllTask);

router.use(protect);

router.post("/", createTask);

router.patch("/:id", updateTask);

export default router;
