import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "Please provide a username"],
    trim: true,
    unique: true,
    lowercase: true,
    index: true,
  },
  email: {
    type: String,
    require: [true, "Please provide a email"],
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    require: [true, "Please provide a password"],
  },
  isVerify: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordExpires: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
