const express = require("express");
const requestconnectionrouter = express.Router();
const {requestconnection} = require("../Controller/requestconection");
const ConnectonRequest = require("../Model/userconnection");
const UserModel = require("../Model/User");
const {userauth} = require("../Middlewares/auth");

requestconnectionrouter.post("/:status/:toUserId", userauth, requestconnection);

module.exports = requestconnectionrouter;