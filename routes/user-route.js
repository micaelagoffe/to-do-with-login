const express = require("express");

const router = express.Router();

const {welcomeRender} = require("../controller/welcome");


router.get("/", welcomeRender);


module.exports = router;