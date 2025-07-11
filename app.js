require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT || 1010;
const cors = require("cors");
const connection = require("./DB/conn.js");
const redisClient = require("./DB/redisclient.js");

const cookieParser = require("cookie-parser");
const authrouter = require("./Routes/auth.js");
const profilerouter = require("./Routes/profilerouter.js");
const requestconnectionrouter = require("./Routes/requestconnection.js");
const reviewconnectionrouter = require("./Routes/reviewconnectrouter.js");
const feedrouter = require("./Routes/feedrouter.js");

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use("/auth/user", authrouter); 
app.use("/user/profile", profilerouter);
app.use("/request/send", requestconnectionrouter);
app.use("/request/review", reviewconnectionrouter);
app.use("/", feedrouter);

app.use("/uploads", express.static("uploads"));

connection.then(() => {
    console.log("Database Successfully Connected");
    app.listen(port, () => {
        console.log(`Server is Running at port ${port}`);
    });
}).catch((err) => {
    console.log("Mongo Err: " + err);
});
