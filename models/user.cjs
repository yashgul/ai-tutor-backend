const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  phoneNo: String,
  password: String,
  firstName: String,
  LastName: String,
  courses: [{ cid: String, difficulty: String }], //0->beginner 1->intermediate 2->advanced
});

var User = mongoose.model("user", userSchema);

module.exports = User;
