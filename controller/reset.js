const User = require("../model/user");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

require("dotenv").config();

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PW,
  },
});

const resetRender = (req, res) => {
  res.render("reset.ejs");
};

const sendResetSubmit = async (req, res) => {
  const email = req.body.email;

  try {
    const user = await User.findOne({ email: email });

    if (!user) return res.redirect("/signup");

    const token = await crypto.randomBytes(32).toString("hex");

    user.token = token;
    user.tokenExpiration = Date.now() + 7200000;
    await user.save();

    await transport.sendMail({
      from: process.env.MAIL_USER,
      to: user.email,
      subject: "Change password",
      html: `<h3>Change password</h3> <p>Use this link to change your password</p> 
      <a href="http://localhost:${process.env.PORT}/reset/${user.token}">Click here!</a>`,
    });

    res.render("check-email.ejs");
  } catch (err) {
    console.log(err);
  }
};

const resetParams = async (req, res) => {
  const token = req.params.token;

  try {
    const user = await User.findOne({
      token: token,
      tokenExpiration: { $gt: Date.now() },
    });

    if (!user) return res.redirect("/signup");

    res.render("new-password.ejs", { email: user.email });
  } catch (err) {
    console.log(err);
  }
};

const resetSubmit = async (req, res) => {
  const password = req.body.password;
  const email = req.body.email;

  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPW = await bcrypt.hash(password, salt);

    const user = await User.findOne({ email: email });

    user.password = hashedPW;
    await user.save();

    res.redirect("/signin");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  resetRender,
  sendResetSubmit,
  resetParams,
  resetSubmit,
};