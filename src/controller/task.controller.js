import { taskService } from "../services/index.js";

export const getAllTask = async (req, res) => {
  // 1) Calling get all tasl service
  const { type, message, statusCode, allTask } = await taskService.getAllTask();

  // 2) Check if something went wrong
  if (type === "Error") {
    return res.status(statusCode).json({
      type,
      message: message,
    });
  }

  // 3) If everything is OK, send data
  return res.status(statusCode).json({
    type,
    message: message,
    allTask,
  });
};

export const createTask = async (req, res) => {
  // 1) Calling create task service
  const { type, message, statusCode, task } = await taskService.createTask(
    req.body
  );

  // 2) Check if something went wrong
  if (type === "Error") {
    return res.status(statusCode).json({
      type,
      message: message,
    });
  }

  // 3) If everything is OK, send data
  return res.status(statusCode).json({
    type,
    message: message,
    task,
  });
};

export const updateTask = async (req, res) => {
  // 1) Calling update task service
  const { type, message, statusCode, task } = await taskService.updateTask(
    req.body,
    req.params.id
  );

  // 2) Check if something went wrong
  if (type === "Error") {
    return res.status(statusCode).json({
      type,
      message: message,
    });
  }

  // 3) If everything is OK, send data
  return res.status(statusCode).json({
    type,
    message: message,
    task,
  });
};
