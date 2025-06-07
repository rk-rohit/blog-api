const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../controller/userController");
const { authMiddleware } = require("../middleware/authMiddleware");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.delete("/logout", authMiddleware, logoutUser)

module.exports = userRouter;