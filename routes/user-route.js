const express = require("express");

const router = express.Router();

const {welcomeRender} = require("../controller/welcome");
const {signinRender, signinSubmit} = require("../controller/sign-in");
const {signupRender, signupSubmit} = require("../controller/sign-up");
const {resetRender, sendResetSubmit, resetParams, resetSubmit} = require("../controller/reset");


router.get("/", welcomeRender);

router.get("/signin", signinRender);
router.post("/signin", signinSubmit);

router.get("/signup", signupRender);
router.post("/signup", signupSubmit);

router.get("/reset", resetRender);
router.post("/reset", sendResetSubmit);
router.get("/reset/:token", resetParams);
router.post("/resetPassword", resetSubmit);


module.exports = router;