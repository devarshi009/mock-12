const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config()


const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
 
    const decoded = jwt.verify(token, process.env.KEY);
    if (decoded) {
      const userID =decoded.userID
      console.log(decoded)
      req.body.userID=userID
      next();
    } else {
        res.send({ msg: "Please login" });
     
    }
  } else {
    res.send({ msg: "Please login" });
  }
}

module.exports={
    authenticate,
}