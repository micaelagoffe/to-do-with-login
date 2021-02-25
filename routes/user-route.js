const express = require("express");

const router = express.Router();

const {welcomeRender} = require("../controller/welcome");
const {signinRender, signinSubmit} = require("../controller/sign-in");


router.get("/", welcomeRender);

router.get("/signin", signinRender);
router.post("/signin", signinSubmit)


module.exports = router;