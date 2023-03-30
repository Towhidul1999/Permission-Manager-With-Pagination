const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const permissionSchema = new Schema({
  role: String,
  permission: String,
  user: { type: mongoose.Types.ObjectId, ref: "User" },
});

const Permission = mongoose.model("Permission", permissionSchema);

module.exports = Permission;
