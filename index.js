const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const Link = require("./models/Link");
const Permission = require("./models/Permission");
const middleware = require("./middleware/middleware");

const app = express();
const port = 3000;

app.use(express.json());

//MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/scraper", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected successfully!");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/user", (req, res) => {
  const newUser = new User();
  const newPermission = new Permission();

  newUser.name = req.body.name;
  newUser.email = req.body.email;

  newPermission.role = "user";
  newPermission.permission = "create";
  newPermission.user = newUser._id;

  console.log("meowmmmmm", newUser._id);

  newUser.save();
  newPermission.save();

  res.json(newUser);
});

app.get("/users", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const users = await User.find().limit(limit).skip(startIndex).exec();

  const pagination = {};
  if (endIndex < 5) {
    pagination.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit: limit,
    };
  }

  res.json({
    success: true,
    count: users.length,
    pagination: pagination,
    data: users,
  });
});

app.post("/post/:id", middleware, (req, res) => {
  newLink = new Link();
  newLink.link = req.body.link;

  newLink.save();

  res.json(req.body.link);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
