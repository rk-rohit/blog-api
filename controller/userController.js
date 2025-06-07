const UserModel = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const blacklistedTokens = new Set();

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        status: "failed",
        message: "User with this email already exist!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const result = (
      await UserModel({
        name,
        email,
        password: hashPassword,
      }).save()
    ).toObject();

    delete result.password;
    delete result.isDeleted;
    delete result._id;
    delete result.__v;

    res.status(201).json({
      message: "User Registered Successfully!",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      message: "Failed to register",
      data: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        message: "Email and password is required!",
      });
    }
    let user = await UserModel.findOne({ email });

    if (!user) {
      res.status(400).json({
        message: "Invalid credential!",
      });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      res.status(400).json({
        message: "Invalid credential!",
      });
    }

    const jsontoken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      process.env.JSON_WEB_TOKEN,
      {
        expiresIn: "15m",
      }
    );

    res.status(200).json({
      message: "Login successfully!",
      token: jsontoken,
    });
  } catch (err) {
    res.status(400).json({
      message: "Failed to login!",
      data: err.message,
    });
  }
};

const authMiddleware = async (req, res, next) => {
  const authHeader = req?.headers?.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    res.status(400).json({
      message: "Invalid token!",
    });
  }

  if (blacklistedTokens.has(token))
    return res
      .status(403)
      .json({ status: "failed", message: "Token blacklisted" });

  jwt.verify(token, process.env.JSON_WEB_TOKEN, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    req.token = token;
    next();
  });
};

const logoutUser = async (req, res) => {
  try {
    const authHeader = req?.headers?.authorization;
    const token = authHeader?.split(" ")[1];

    blacklistedTokens.add(token);
    res.status(200).json({
      message: "Logout successfully!",
    });
  } catch (err) {
    res.status(400).json({
      message: "Failed to logout!",
      data: err.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  authMiddleware,
};
