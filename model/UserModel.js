const mongoose = require("mongoose");

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true
    },
    isDeleted: {
        type: Boolean,
        default: false,
        select: false,
    },
    createdAt : {
        type: Date,
        default: Date.now()
    }
})

const UserModel = mongoose.model("User", userModel);

module.exports = UserModel;