const express = require("express");
const app = express();

const userRouter = require("./routes/user-route");
const blogRouter = require("./routes/blog-route")

//middleware
app.use(express.json());

//router
app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);



module.exports = app;
