const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyparser = require('body-parser');
const cookieparser = require("cookie-parser");

const userRoute = require("./routes/user-route");

const app = express();

dotenv.config();

app.use(express.static(__dirname + "/public"));

app.use(bodyparser.urlencoded({extended: false}));

app.use(cookieparser());

app.set("view engine", "ejs");

app.use(userRoute);

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, () => {
    app.listen(process.env.PORT, () => {
        console.log("Server is up and running");
    });
});