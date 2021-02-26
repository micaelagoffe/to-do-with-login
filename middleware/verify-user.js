const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();


const verifiedToken = (req, res, next) => {
  const token = req.cookies.jwtToken;

  if (!token) return res.render("signin.ejs", { err: "You've been signed out" }); //Felmeddelande i EJS-fil

  const validUser = jwt.verify(token, process.env.SECRET);

  if (validUser) req.user = validUser;
  // console.log(req.user);
  // console.log(validUser);

  next();
};

module.exports = verifiedToken;