require('dotenv').config();
const UserModel = require("../Model/User.js");
const multer = require("multer");
const path = require("path");
const {validatesignupdata} = require("../utils/validation.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const createuser = async (req, res) => {
    try {
        //validation start----
            validatesignupdata(req);

        //Encrypt Password----
        const { firstname, lastname, email, password, about, age, gender} = req.body;
        const saltround = 10;
        const hashpassword = await bcrypt.hash(password, saltround);
        
        // 1. Get uploaded file name or fallback to default
        const profile = req.file ? req.file.filename : "default.png";

        // 2. Set creation date
        const createdat = new Date();

        // 3. Create user with full data
        const userdata = new UserModel({
            firstname, 
            lastname, 
            email, 
            password:hashpassword,
            about,
            age, 
            gender,
            profile,
            createdat
        });

        console.log(userdata)
        await userdata.save();
        return res.status(200).json({ message: "User created successfully", data: userdata });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const loginuser = async (req,res) => {
    try {
        const { email, password } = req.body || {};
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }
        const user = await UserModel.findOne({email:email});
        if(!user){
            return res.status(404).json({ error: "Invalid Credentials" });
        }
        const ispasswordvalid = await user.verifypassword(password);
        if(ispasswordvalid){
            const token = await user.getJWT();
            res.cookie('token', token, 
                {
                    expires: new Date(Date.now() + 8 * 3600000)
                });
            return res.status(201).json({message:"Login Succesfully"});
        }else {
            return res.status(401).json({ error: "Invalid Credentials" });
        }
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}

const logoutuser = async (req,res) => {
    res.cookie('token', null, 
    {
        expires: new Date(Date.now()),
    });
    res.status(201).json({message:"Logout Succesfully"})
}

module.exports = {createuser, loginuser, logoutuser};