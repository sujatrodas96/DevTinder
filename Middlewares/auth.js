const jwt = require("jsonwebtoken");
const UserModel = require("../Model/User");

const userauth = async (req,res,next) => {
    try {
        const {token} = req.cookies;
        const decodedobj = await jwt.verify(token, process.env.TOKEN);
        const {_id} =  decodedobj;
        const user = await UserModel.findById(_id);
        if(!user){
            throw new Error("User Not Found");
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
    
}

module.exports = {userauth};