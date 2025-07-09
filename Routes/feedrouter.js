const express = require("express");
const feedrouter = express.Router();
const {reviewconnection} = require("../Controller/reviewconnection");
const {requestconnection} = require("../Controller/requestconection");
const {feed} = require("../Controller/feed");
const ConnectonRequest = require("../Model/userconnection");
const UserModel = require("../Model/User");
const {userauth} = require("../Middlewares/auth");

feedrouter.get("/feed", userauth, feed);

module.exports = feedrouter;