const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

const todoRouter = require("./routes/todo.router.js");

const connect = require("./connection/index.js");
connect();

app.use(cors());
app.use(express.json());
app.use("/api", [todoRouter]);

app.get("/", (req, res) => {
  res.send("Hello, To-Do List!");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
