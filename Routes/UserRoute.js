const express = require("express");
const router = express.Router();
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
const {createuser, loginuser, userprofile} = require("../Controller/usercontroller");
const {userauth} = require("../Middlewares/auth");

router.post("/create", upload.single("profile"), createuser);
router.post("/login", loginuser);
router.get("/profile", userauth, userprofile);

module.exports = router;