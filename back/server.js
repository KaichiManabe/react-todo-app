import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
const allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Authorization,access_token"
  );
  if ("OPTIONS" === req.method) {
    res.send(200);
  } else {
    next();
  }
};
app.use(allowCrossDomain);

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello Express!");
});

app.get("/todo/:id", async (req, res) => {
  const todo = await prisma.todo.findUnique({
    where: {
      id: Number(req.params.id),
    },
  });
  res.json(todo);
});

app.get("/todos", async (req, res) => {
  const todos = await prisma.todo.findMany();
  return res.json(todos);
});

app.post("/todo", async (req, res) => {
  const todo = req.body;
  const newTodo = await prisma.todo.create({
    data: todo,
  });
  return res.json(newTodo);
});

app.put("/todo/:id", async (req, res) => {
  const todo = req.body;
  const updatedTodo = await prisma.todo.update({
    where: {
      id: Number(req.params.id),
    },
    data: todo,
  });
  return res.json(updatedTodo);
});

app.delete("/todo/:id", async (req, res) => {
  const updatedTodo = await prisma.todo.delete({
    where: {
      id: Number(req.params.id),
    },
  });
  return res.json(updatedTodo);
});

app.listen(port, () => {
  console.log("running on port", port);
});
