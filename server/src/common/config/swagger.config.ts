export const swaggerOptions = {
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
