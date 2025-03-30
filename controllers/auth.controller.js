const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password, role, avatar } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "Email already registered",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await userModel.create({
        name,
        email,
        password: hashedPassword,
        role,
        avatar,
      });
      return res.status(201).send({
        success: true,
        message: "User registered successfully",
        user,
      });
    }
  } catch (error) {
    console.log("Error in registering user".white.bgRed);
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(200).send({
      success: true,
      message: "User logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
      token,
    });
  } catch (error) {
    console.log("Error in logging in user".white.bgRed);
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).send({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.log("Error in logging out user".white.bgRed);
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  register,
  login,
  logout,
};
