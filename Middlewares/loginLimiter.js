const rateLimit = require("express-rate-limit");
const RedisStore = require("rate-limit-redis").default;
const redisClient = require("../DB/redisclient");

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 3,
  store: new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
  }),
  message: "Too many login attempts. Please try again later.",
});

module.exports = {loginLimiter};
