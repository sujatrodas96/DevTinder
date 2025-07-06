const UserModel = require("../Model/User.js");
const {validatesignupdata,validateprofileeditdata} = require("../utils/validation.js");


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

const userprofileedit = async (req,res) => {
    try {
        if(!validateprofileeditdata(req)){
            return res.status(401).json({message:"Invalid Edit Request"})
        }

        const loggedinuser = req.user;
        Object.keys(req.body).forEach((key) => (loggedinuser[key] = req.body[key]));
        await loggedinuser.save();
        return res.status(201).json({message: `${loggedinuser.firstname} your profile has been updated succesfully`});
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
    
}

module.exports = {userprofile,userprofileedit};