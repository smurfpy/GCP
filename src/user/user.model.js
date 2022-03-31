let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const userSchema = new Schema({     //เขียน schema ลงใน MongoDB
  id: {                           //กำหนดประเภท ID
    type: String,
    default: null,
  },
  email: {                  //กำหนดประเภท Email
    type: String,
    required: [true, "email required"],
    unique: [true, "email already registered"],
  },
  firstName: String,
  lastName: String,
  profilePhoto: String,
  password: String,
  accessToken : String,
  refreshToken : String,
  source: { type: String, required: [true, "source not specified"] },
  lastVisited: { type: Date, default: new Date() }
});

var userModel = mongoose.model("User", userSchema, "User");   //ชื่อของ Schema ใน MongoDB

module.exports = userModel;