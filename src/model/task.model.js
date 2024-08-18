import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },

    isComplete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model.Task || mongoose.model("Task", taskSchema);
