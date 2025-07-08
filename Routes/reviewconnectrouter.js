const express = require("express");
const reviewconnectionrouter = express.Router();
//const {requestconnection} = require("../Controller/requestconection");
const {reviewconnection} = require("../Controller/reviewconnection");
const ConnectonRequest = require("../Model/userconnection");
const UserModel = require("../Model/User");
const {userauth} = require("../Middlewares/auth");

reviewconnectionrouter.post("/:status/:requestId", userauth, reviewconnection);

module.exports = reviewconnectionrouter;