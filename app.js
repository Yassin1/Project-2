const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();

const conn = require("./db/db.js");

const app = express();
app.listen(process.env.PORT, () => {
    console.log("server starterd at 3000")
});
console.log(conn);