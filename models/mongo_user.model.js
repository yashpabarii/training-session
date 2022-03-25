const mongoose = require("mongoose");

//Attributes of the Course object
var userSchema = new mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone_number: {
    type: String,
  },
  address: {
    type: String,
  },
  role_id: {
    type: Number,
  },
  password: {
    type: String,
  },
  gender: {
    type: String,
  },
  is_active: {
    type: Boolean,
  },
});

mongoose.model("User", userSchema);
