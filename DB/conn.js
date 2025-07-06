require('dotenv').config();
const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;
const connection = mongoose.connect(DB_URL);

module.exports = connection;
