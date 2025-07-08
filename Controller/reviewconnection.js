const jwt = require("jsonwebtoken");
const UserModel = require("../Model/User");
const {userauth} = require("../Middlewares/auth");
const ConnectonRequest = require("../Model/userconnection");


const reviewconnection = async (req,res) => {
    try {
        const loggedinuser = req.user;
        const {status, requestId} = req.params;

        //validate the status
        const allowedstatus = ["accepted", "rejected"];
        if(!allowedstatus.includes(status)){
            return res.status(400).json({message:"Inavlid Status Allowed"});
        }

        //allowed connection req
        const connectionreq = await ConnectonRequest.findOne({
            _id: requestId,
            toUserId: loggedinuser._id,
            status: 'interested',
        });

        if(!connectionreq){
            return res.status(404).json({message:"connection req is not found"});
        }

        connectionreq.status = status;
        const data = await connectionreq.save();
        return res.status(201).json({message: loggedinuser.firstname + ' '+ status +" The connection request ", data});
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}

module.exports = {reviewconnection};