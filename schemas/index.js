const mongoose = require("mongoose");
require("dotenv").config();

const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const connect = () => {
  mongoose
    .connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@todo-cluster.az6hh.mongodb.net/?retryWrites=true&w=majority&appName=todo-cluster`
    )
    .then(() => console.log("Connected!"))
    .catch((err) => console.log(`Failed :(  ${err}`));
};

mongoose.connection.on("error", (err) => {
  console.log("MongoDB 연결 에러", err);
});

module.exports = connect;
