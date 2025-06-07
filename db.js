const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING, {
      autoIndex: true,
    });
    console.log("db connection successfull!");
  } catch (err) {
    console.log("connection failed -", err);
  }
};
