import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
const errorHandler = (err) => {
  if (err.code === 11000) {
    return { email: "Email is already registered" };
  } else {
    const errors = Object.values(err.errors).map((error) => error.properties);
    const response = {};
    errors.forEach((error) => {
      response[error.path] = error.message;
    });
    return response;
  }

  console.log(errors);
};
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET);
};
const user_login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await userModel.login(email, password);
    const token = createToken(user._id);
    res.json({
      status: true,
      message: "Logged in successfully",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: false,
      message: "Failed to login",
      error: err.message,
    });
  }
};

const user_signup = async (req, res) => {
  try {
    const user = await userModel.create(req.body);
    const token = createToken(user._id);
    res.status(201).json({
      status: true,
      message: "Account created",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    const errors = errorHandler(err);
    console.log(errors);
    res.status(400).json({
      status: false,
      message: "Failed to sign up",
      errors,
    });
  }
};

export { user_login, user_signup };
