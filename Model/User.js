const mongoose = require("mongoose");
//const { isLowercase } = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        minlength:3,
        maxlength:10
    },
    lastname:{
        type:String,
        required:true,
        minlength:3,
        maxlength:10
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    about:{
        type:String
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String
    },
    profile:{
        type:String,
        default:'default.png'
    },
    createdat:{
        type:Date,
        default:Date.now
    }
})
User.index({firstname: 1, lastname: 1});

User.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign
    (
        {_id: user._id}, 
        process.env.TOKEN, 
        {expiresIn: "1h" }
    );
    return token;
}

User.methods.verifypassword = async function (passwordinputbyuser) {
    const user = this;
    const passwordhash = user.password;
    const ispasswordvalid = bcrypt.compare
    (
        passwordinputbyuser, 
        passwordhash
    );
    return ispasswordvalid;
}
const UserModel = mongoose.model("User", User);
module.exports = UserModel;