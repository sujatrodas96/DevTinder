const UserModel = require("../Model/User.js");
const multer = require("multer");
const path = require("path");
const {validatesignupdata} = require("../utils/validation.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require('dotenv').config();

const createuser = async (req, res) => {
    try {
        //validation start----
            validatesignupdata(req);

        //Encrypt Password----
        const { firstname, lastname, email, password, gender} = req.body;
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
        const ispasswordvalid = await bcrypt.compare(password, user.password);
        if(ispasswordvalid){
            const token = await jwt.sign({_id: user._id}, process.env.TOKEN, {expiresIn: "1h" });
            console.log(token);
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

const userprofile = async (req,res) => {
    try {
        const userprofiledata = req.user;
            if(!userprofiledata){
                res.status(404).json({message:"No Profile Found"});
            }else{ 
                res.status(201).json({data:userprofiledata});
            } 
        } catch (error) {
            console.error("Error creating user:", error);
            return res.status(500).json({ message: "Server Error", error: error.message });
        }
}

module.exports = {createuser, loginuser, userprofile};