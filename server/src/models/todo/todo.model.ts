import mongoose, { Schema } from "mongoose";
import { ITodo } from "../../types/todo/todo.type";

const todoSchema: Schema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const Todo = mongoose.model<ITodo>("todolist", todoSchema);
