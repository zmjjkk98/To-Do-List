const Todo = require("../models/todo");
const express = require("express");
const router = express.Router();

router.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/todos", async (req, res) => {
  const { title } = req.body;

  const newTodo = new Todo({
    title,
  });

  try {
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/todos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findById(id);

    todo.completed = !todo.completed;

    const updatedTodo = await todo.save();
    // const updatedTodo = await Todo.findByIdAndUpdate(
    //   id,
    //   { title, completed, },
    //   { new: true }
    // );
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Todo.findByIdAndDelete(id);
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
