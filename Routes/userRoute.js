const express = require("express");
const { Register, Login, Profile, updateProfile } = require("../controller/userController");
const Router = express.Router();

Router.route("/register").post(Register);
Router.route("/login").post(Login);
Router.route("/getProfile/:id").get(Profile).patch(updateProfile);


module.exports = Router;