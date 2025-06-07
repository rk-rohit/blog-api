const express = require("express");

const { getMyBlog, getAllBlog, createBlog } = require("../controller/blogController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// GET: All blogs (with author info)
router.get("/", getAllBlog);

// GET: Blogs by logged-in user
router.get("/my", authMiddleware, getMyBlog);

// POST: Create blog
router.post("/", authMiddleware, createBlog);

module.exports = router;
