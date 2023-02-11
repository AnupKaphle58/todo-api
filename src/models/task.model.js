import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  taskname: {
    type: String,
    required: [true, "Please enter the task"],
    trim: true,
  },
  taskstatus: {
    type: String,
    enum: ["TODO", "INPROGRESSS", "TESTING", "DONE"],
    required: true,
    default: "TODO",
  },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
