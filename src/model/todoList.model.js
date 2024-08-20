import mongoose from "mongoose";

const todoListSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      default: "Todo List",
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],

    isPublic : {
        type : Boolean, 
        default : false,
    }
  },
  { timestamps: true }
);

export const TodoList = mongoose.models.TodoList || mongoose.model("TodoList", todoListSchema);
