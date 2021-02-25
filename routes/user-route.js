const express = require("express");

const router = express.Router();

const {welcomeRender} = require("../controller/welcome");
const {signinRender, signinSubmit} = require("../controller/sign-in");
const {signupRender, signupSubmit} = require("../controller/sign-up");


router.get("/", welcomeRender);

router.get("/signin", signinRender);
router.post("/signin", signinSubmit);

router.get("/signup", signupRender);
router.post("/signup", signupSubmit);


module.exports = router;