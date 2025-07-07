const express = require("express");
const authrouter = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });
const UserModel = require("../Model/User");
const {createuser, loginuser, logoutuser} = require("../Controller/usercontroller");

const {userauth} = require("../Middlewares/auth");
const {loginLimiter} = require("../Middlewares/loginLimiter");

authrouter.post("/signup", upload.single("profile"), createuser);
authrouter.post("/login", loginLimiter, loginuser);
authrouter.post("/logout", logoutuser);

module.exports = authrouter;