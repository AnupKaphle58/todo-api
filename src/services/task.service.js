// model
import { Task } from "../models/index.js";

export const getAllTask = async () => {
  const allTask = await Task.find();
  if (allTask.length === 0) {
    return {
      type: "Success",
      message: "There are no task currently.",
      statusCode: 204,
    };
  }
  return {
    type: "Success",
    statusCode: 201,
    message: "Task fetched successfully",
    allTask,
  };
};

export const createTask = async (body) => {
  const { taskname, taskstatus } = body;
  if (!taskname || !taskstatus) {
    return {
      type: "Error",
      message: "Fields cannot be empty",
      statusCode: 400,
    };
  }
  try {
    const task = await Task.create({ taskname, taskstatus });
    return {
      type: "Success",
      statusCode: 201,
      message: "Task created successfully",
      task,
    };
  } catch (error) {
    if (error.errors.taskstatus.kind == "enum") {
      return {
        type: "Error",
        statusCode: 403,
        message:
          "Allowed value for taskstatus are : [ 'TODO', 'INPROGRESSS', 'TESTING', 'DONE' ]",
      };
    }
    return {
      type: "Error",
      statusCode: 404,
      message: "Opps something went wrong",
    };
  }
};

export const updateTask = async (body, id) => {
  const { taskstatus } = body;
  if (!taskstatus) {
    return {
      type: "Error",
      message: "Fields cannot be empty",
      statusCode: 400,
    };
  }
  try {
    const findtask = await Task.findById({ _id: id });
    if (taskstatus == findtask.taskstatus) {
      return {
        type: "Error",
        statusCode: 409,
        message: "Please change the task status to update",
      };
    }
    await Task.findByIdAndUpdate(id, body, { runValidators: true });
    return {
      type: "Success",
      statusCode: 200,
      message: "Updated",
    };
  } catch (error) {
    if (error.errors.taskstatus.kind == "enum") {
      return {
        type: "Error",
        statusCode: 403,
        message:
          "Allowed value for taskstatus are : [ 'TODO', 'INPROGRESSS', 'TESTING', 'DONE' ]",
      };
    }
    return {
      type: "Error",
      statusCode: 404,
      message: "Opps something went wrong",
    };
  }
};
