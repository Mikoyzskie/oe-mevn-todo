import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import connectDB from "./src/db/db.connection";
import { ApiPath } from "./src/common/enums/enums";
import { todoRoutes } from "./src/routes/routes";
import limiter from "./src/common/helpers/rate-limiter.helper";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(limiter);
app.use(helmet());

connectDB();

const swaggerOptions = {
  definition: {
    openapi: "3.0.4",
    info: {
      title: "Todo REST API - OpenAPI 3.0",
      version: "1.0.0",
      description:
        "The To-Do API, built with OpenAPI 3, allows users to create, retrieve, update, and delete tasks efficiently. It supports authentication, task filtering, and sorting, making it ideal for personal and team productivity apps.<br><br> Some useful links:<br> &nbsp; - [Github](https://github.com/Mikoyzskie/oe-mevn-todo)",
    },
    servers: [{ url: "http://localhost:5000" }],
    tags: [
      {
        name: "todo",
        description: "All about todo",
      },
    ],
  },
  apis: ["src/routes/todo/todo.routes.ts"],
};

app.use(ApiPath.TODO, todoRoutes);

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const PORT = process.env.PORT || 5000;
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ error: err.message });
});
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
