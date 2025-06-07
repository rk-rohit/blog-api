const express = require("express");
const { registerUser, loginUser, logoutUser, authMiddleware } = require("../controller/userController");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.delete("/logout", authMiddleware, logoutUser)

module.exports = userRouter;