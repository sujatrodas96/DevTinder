const jwt = require("jsonwebtoken");
const UserModel = require("../Model/User");
const {userauth} = require("../Middlewares/auth");
const ConnectonRequest = require("../Model/userconnection");

const requestconnection = async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedstatus = ["ignored", "interested"];
        if(!allowedstatus.includes(status)){
            return res.status(400).json({message:"Invalid Status Type " + status});
        }

        const existingconnectionrequest = await ConnectonRequest.findOne({
            $or:[ 
                {fromUserId, toUserId},
                {fromUserId : toUserId, toUserId : fromUserId},
            ],
        })
        if(existingconnectionrequest){
            return res.status(400).json({message:"Connection Request Already Exist"})
        }

        const userexist = await UserModel.findById(toUserId);
        if(!userexist){
           return res.status(400).json({message:"User Not Found"});
        }

        const newConnectonRequest = new ConnectonRequest({
            fromUserId,
            toUserId,
            status,
        })

        const data = await newConnectonRequest.save();
        return res.status(201).json({ message: "ConnectRequest Send Succesfully", data});
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}

module.exports =  { requestconnection };