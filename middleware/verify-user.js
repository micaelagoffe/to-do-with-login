const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const verifiedToken = (req, res, next) => {
  const token = req.cookies.jwToken;

  if (!token) return res.render("signin.ejs", {err: "Access denied, sign in!"});

  const validUser = jwt.verify(token, process.env.SECRET);

  if (validUser) req.user = validUser;

  next();
};

module.exports = verifiedToken;