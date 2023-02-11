import { signup, signin } from "./auth.service.js";
import { getAllTask, createTask, updateTask } from "./task.service.js";

const authService = {
  signup,
  signin,
};

const taskService = {
  getAllTask,
  createTask,
  updateTask,
};

export { authService, taskService };
