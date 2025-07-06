const mongoose = require("mongoose");
//const { isLowercase } = require("validator");

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
        isLowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String
        //enum : ['male','female','third']
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

const UserModel = mongoose.model("User", User);
module.exports = UserModel;