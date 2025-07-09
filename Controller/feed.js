const jwt = require("jsonwebtoken");
const UserModel = require("../Model/User");
const { userauth } = require("../Middlewares/auth");
const ConnectonRequest = require("../Model/userconnection");

const feed = async (req, res) => {
  try {
    const loggedinuser = req.user;
    const USER_SAFE_DATA = "firstname lastname profile age gender about";
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;
    
    const connectionRequest = await ConnectonRequest.find({
      $or: [
        { fromUserId: loggedinuser._id },
        { toUserId: loggedinuser._id }
      ]
    }).select("fromUserId toUserId");

    const hideUser = new Set(); 
    connectionRequest.forEach(req => {
        hideUser.add(req.fromUserId.toString());
        hideUser.add(req.toUserId.toString());
    });

    const showuser = await UserModel.find({
       $and: 
       [
        {_id: {$nin: Array.from(hideUser)}}, 
        {_id: {$ne: loggedinuser._id}},
       ],
    }).select(USER_SAFE_DATA).skip(skip).limit(limit);

    return res.status(201).json({message: "Feed API Data ", data:showuser});
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = { feed };
