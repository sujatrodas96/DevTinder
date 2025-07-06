const express = require("express");
const profilerouter = express.Router();
const UserModel = require("../Model/User");
const {userprofile, userprofileedit} = require("../Controller/profilecontroller");
const {userauth} = require("../Middlewares/auth");

profilerouter.get("/view", userauth, userprofile);
profilerouter.patch("/edit", userauth, userprofileedit);

module.exports = profilerouter;