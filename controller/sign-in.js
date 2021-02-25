const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signinRender = (req, res) => {
  res.render("signin.ejs");
};

const signinSubmit = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) return res.redirect("/singup");

  const validPW = await bcrypt.compare(password, user.password);
  if (!validPW) return res.redirect("/signin");

  const jwtToken = jwt.sign({ username: user }, process.env.SECRET);

  if (jwtToken) {
    const cookie = req.cookies.jwtToken;

    if (!cookie) {
      res.cookie("jwtToken", jwtToken, { maxAge: 7200000, httpOnly: true });
    }

    return res.redirect("/todos");
  }

  return res.redirect("/signin");
};

module.exports = {
  signinRender,
  signinSubmit
};