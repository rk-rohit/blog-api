const jwt = require("jsonwebtoken");
const { isBlacklisted } = require("../blacklist");

const authMiddleware = async (req, res, next) => {
    const authHeader = req?.headers?.authorization;
    const token = authHeader?.split(" ")[1];
  
    if (!token) {
      res.status(400).json({
        message: "Invalid token!",
      });
    }
  
    if (isBlacklisted(token))
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
  

  module.exports = {
    authMiddleware
  }