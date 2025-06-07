const BlogModel = require("../model/BlogModel");
const UserModel = require("../model/UserModel");

const getAllBlog = async (req, res) => {
  try {
    const blogs = await BlogModel.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json({
      message: "Successfully get blogs!",
      blogs,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
};

const getMyBlog = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.user.email });
    const blogs = await BlogModel.find({ user: user._id }).sort({
      createdAt: -1,
    });
    res.json({
      message: "Successfully get blogs!",
      blogs,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user blogs" });
  }
};

const createBlog = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content required!" });
  }

  try {
    let blog = new BlogModel({ title, content, user: req.user.id });
    blog = await blog.save();

    const populated = await BlogModel.findById(blog._id).populate(
      "user",
      "name email"
    );

    // 🔔 Notify via WebSocket
    req.app.get("io").emit("new-post", populated);

    res.status(201).json({ message: "Blog created", blog: populated });
  } catch (err) {
    res.status(500).json({ message: "Blog creation failed", err});
  }
};

module.exports = {
  getAllBlog,
  getMyBlog,
  createBlog,
};
