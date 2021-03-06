const User = require("../model/user");
const bcrypt = require("bcrypt");

const signupRender = (req, res) => {
  res.render("signup.ejs");
};

const signupSubmit = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPW = await bcrypt.hash(password, salt);

    await new User({
      username: username,
      email: email,
      password: hashedPW,
    }).save();

    return res.redirect("/signin");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  signupRender,
  signupSubmit,
};