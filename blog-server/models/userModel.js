import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please provide a username"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [4, "Password must be at least 4 characters"],
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

//! Encrypt Password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
});

//! Mactch Password
userSchema.methods.comparePasswords = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model("User", userSchema);
