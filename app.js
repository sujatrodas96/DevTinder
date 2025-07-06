require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT || 1010;
const cors = require("cors");
const connection = require("./DB/conn.js");
const cookieParser = require("cookie-parser");

const authrouter = require("./Routes/auth.js");
const profilerouter = require("./Routes/profilerouter.js");

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use("/auth/user", authrouter); 
app.use("/user/profile", profilerouter); 

app.use("/uploads", express.static("uploads"));

connection.then(() => {
    console.log("Database Successfully Connected");
    app.listen(port, () => {
        console.log(`Server is Running at port ${port}`);
    });
}).catch((err) => {
    console.log("Mongo Err: " + err);
});
