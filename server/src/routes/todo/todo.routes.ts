import { Router } from "express";
import { Todo } from "../../models/models";
import asyncHandler from "../../common/helpers/async-handler.helper";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "67e656022dcc7f704e47efec"
 *         title:
 *           type: string
 *           example: "Take a fuckin bath"
 *         completed:
 *           type: boolean
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-03-17T07:28:24.109Z"
 *         __v:
 *           type: integer
 *           example: 0
 *     TodoCreateRequestBody:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *          example: "Take a fuckin bath"
 *     TodoUpdateRequestBody:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *          example: "Take a fuckin bath"
 *        completed:
 *          type: boolean
 *          example: false
 *        createdAt:
 *          type: string
 *          format: date-time
 *          example: "2025-03-17T07:28:24.109Z"
 *     Error:
 *      type: object
 *      properties:
 *       code:
 *         type: string
 *       message:
 *         type: string
 *      required:
 *        - code
 *        - message
 */

/**
 * @swagger
 * /todos:
 *   get:
 *     tags:
 *     - todo
 *     summary: Retrieve todo list
 *     description: Retrieve todo list
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *          application/json:
 *            schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 *       default:
 *         description: Unexpected error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const todos = await Todo.find();
    if (todos) {
      res.status(200).json(todos);
    } else {
      res.status(404).json(todos);
    }
  }),
);

/**
 * @swagger
 * /todos:
 *   post:
 *     tags:
 *     - todo
 *     summary: Create a new Todo
 *     description: Create a new Todo
 *     operationId: save
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/TodoCreateRequestBody'
 *      required: true
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Todo'
 *       default:
 *         description: Unexpected error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { title, completed = false, createdAt = Date.now() } = req.body;
    const todo = new Todo({ title, completed, createdAt });

    await todo.save();
    res.status(201).json(todo);
  }),
);

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     tags:
 *     - todo
 *     summary: Create a new Todo
 *     description: Create a new Todo
 *     operationId: findByIdAndUpdate
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The id that needs to be fetched and updated. Use 67e656022dcc7f704e47efec for testing
 *        required: true
 *        schema:
 *          type: string
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/TodoUpdateRequestBody'
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Todo'
 *       default:
 *         description: Unexpected error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const todo = await Todo.findByIdAndUpdate(req.params.id, {
      ...req.body,
    });
    res.json(todo);
  }),
);

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     tags:
 *     - todo
 *     summary: Delete a todo
 *     description: Delete an existing item by id
 *     operationId: findByIdAndDelete
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The id that needs to be fetched and deleted. Use 67e656022dcc7f704e47efec for testing
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: item is successfully deleted
 *       default:
 *         description: Unexpected error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  }),
);

export { router as todoRoutes };
