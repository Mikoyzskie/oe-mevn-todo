import { Router } from "express";
import { Todo } from "../../models/models";
import asyncHandler from "../../common/helpers/async-handler.helper";

const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
  }),
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { title, completed = false, createdAt = Date.now() } = req.body;
    const todo = new Todo({ title, completed, createdAt });

    await todo.save();
    res.status(201).json(todo);
  }),
);

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { new: true },
    );
    res.json(todo);
  }),
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  }),
);

export { router as todoRoutes };
