const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    avatar: {
        type: String,
        required: [true, "A User must provide his profile picture"]
    },
    name: {
        type: String,
        require: [true, "A User must provide his Name"]
    },
    bio: {
        type: String,
        required: [true, "A User must provide a brief description"]
    },
    phone: {
        type: Number,
        unique: true,
        required: [true, "A User must provide his Phone Number"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "A User must provide his unique Email Id"]
    },
    password: {
        type: String,
        required: [true, "A User must provide his password"]
    }
});

const User = mongoose.model("Users", userSchema);

module.exports = User;