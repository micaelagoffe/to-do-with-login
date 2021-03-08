const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const signinRender = (req, res) => {
  res.render("signin.ejs", {err: ""});
};

const signinSubmit = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) return res.render("signin.ejs", {err: "User not found"});

  const validPW = await bcrypt.compare(password, user.password);
  if (!validPW) return res.render("signin.ejs", {err: "Invalid password"});

  const jwToken = jwt.sign({ username: user }, process.env.SECRET);

  if (jwToken) {
    const cookie = req.cookies.jwtToken;

    if (!cookie) {
      res.cookie("jwToken", jwToken, { maxAge: 7200000, httpOnly: true });
    }

    return res.redirect("/todos");
  }

  return res.redirect("/signin");
};

module.exports = {
  signinRender,
  signinSubmit,
};