import { promisify } from "util";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import AppError from "../utils/appError.js";

// Create token
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

export const signup = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    console.log(userName , email , password)

    const newUser = await User.create({
      userName,
      email,
      password,
    });

    res.status(201).json({
      status: "success",
      message: "Registration is successfully",
      user: newUser,
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1) Check if email and password axist
    if (!email || !password)
      return next(new AppError("Please provide email and password", 400));

    // 2) Check if user exists
    const user = await User.findOne({ email }).select("+password");

    if (!user)
      return next(
        new AppError("This user does not exist, please sign up", 400)
      );

    // 3) Check Password is correct
    if (!(await user.comparePasswords(password)))
      return next(new AppError("Incorrect email or password", 401));

    // 4) IF everything ok, send token to clint
    const token = signToken(user._id);

    res.status(200).json({
      status: "success",
      message: "Logged in successfully",
      token,
      user,
    });
  } catch (err) {
    next(err);
  }
};

export const protect = async (req, res, next) => {
  try {
    // 1) Getting token and check of it's there
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token)
      return next(
        new AppError("You are not logged in! please login to get access.", 400)
      );

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET_KEY
    );

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser)
      return next(
        new AppError(
          "The user beloging to this token does no longer exist.",
          400
        )
      );

    // Grant access to protected route
    req.user = currentUser;

    next();
  } catch (err) {
    next(err);
  }
};
