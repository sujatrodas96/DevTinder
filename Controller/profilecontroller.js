const UserModel = require("../Model/User.js");
const redisClient = require("../DB/redisclient.js");
const { validatesignupdata, validateprofileeditdata } = require("../utils/validation.js");

const userprofile = async (req, res) => {
  try {
    const userId = req.user._id.toString(); // Get unique user ID
    const cacheKey = `userprofile:${userId}`;

    // 1. Check if profile is in Redis
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return res.status(200).json({
        message: "Profile fetched from cache",
        data: JSON.parse(cachedData),
      });
    }

    // 2. If not cached, return from DB (req.user is already populated)
    const userprofiledata = req.user;
    if (!userprofiledata) {
      return res.status(404).json({ message: "No Profile Found" });
    }

    // 3. Store in Redis for next time (TTL = 1 hour)
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(userprofiledata));

    return res.status(201).json({ data: userprofiledata });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const userprofileedit = async (req, res) => {
  try {
    if (!validateprofileeditdata(req)) {
      return res.status(401).json({ message: "Invalid Edit Request" });
    }

    const loggedinuser = req.user;
    const userId = loggedinuser._id.toString();
    const cacheKey = `userprofile:${userId}`;

    // Apply updates
    Object.keys(req.body).forEach((key) => (loggedinuser[key] = req.body[key]));
    await loggedinuser.save();

    // Update the Redis cache after saving
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(loggedinuser));

    return res.status(201).json({
      message: `${loggedinuser.firstname}, your profile has been updated successfully`,
      data: loggedinuser,
    });
  } catch (error) {
    console.error("Error editing user profile:", error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {userprofile,userprofileedit};