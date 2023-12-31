const mongoose = require("mongoose");
const plm = require("passport-local-mongoose")
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URL)

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  profileImage: String,
  boards: {
    type: Array,
    default: []
  }
})

userSchema.plugin(plm);

module.exports = mongoose.model("user", userSchema )