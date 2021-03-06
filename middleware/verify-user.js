const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();


const verifiedToken = (req, res, next) => {
  const token = req.cookies.jwtToken;

  if (!token) return res.render("signin.ejs");

  const validUser = jwt.verify(token, process.env.SECRET);

  if (validUser) req.user = validUser;

  next();
};

module.exports = verifiedToken;