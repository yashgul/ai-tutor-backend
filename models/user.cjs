const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: String,
  phoneNo: String,
  password: String,
  firstName: String,
  LastName: String,
});

var User = mongoose.model("user", userSchema);

module.exports = User;
