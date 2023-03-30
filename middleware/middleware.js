const Permission = require("../models/Permission");

async function middleware(req, res, next) {
  console.log(req.params.id);

  const user = await Permission.findOne({ user: req.params.id }).populate(
    "user"
  );

  if (user.permission == "create") {
    next();
  }
  res.json("No permission to edit!");
}

module.exports = middleware;
