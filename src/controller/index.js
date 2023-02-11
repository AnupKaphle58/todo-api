import { signup, signin, logout } from "./auth.controller.js";
import { getAllTask, createTask, updateTask } from "./task.controller.js";

const authController = {
  signup,
  signin,
  logout,
};

const taskController = {
  getAllTask,
  createTask,
  updateTask,
};

export { authController, taskController };
