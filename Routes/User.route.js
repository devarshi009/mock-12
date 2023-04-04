const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/UserModel");
const userRouter = express.Router();
require("dotenv").config();

userRouter.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (err) {
    console.log({ err: err });
    res.send({ err: err });
  }
});

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const salt = 6;
    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) {
        console.log(err);
      } else {
        const user = new UserModel({ name, email, password: hash });
        await user.save();
    
        res.status(201).json({
          success: true,
          msg: "Sign In Successful",
        });
      }
    });
  } catch (error) {
    console.log({ err: err });
    res.send({
      success: false,
      error: error,
      msg: "Sign In Failed",
    });
  }
});
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const salt = 6;

    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, process.env.KEY);

          res.status(201).json({
            success: true,
            msg: "Login Successful",
            token: token,
          });
        } else {
          res.send({
            success: false,
            msg: "Invalid Credentials",
            err: err,
          });
        }
      });
    }
  } catch (error) {
    console.log({ err: err });
    res.send({
      success: false,
      error: error,
      msg: "Invalid Credentials",
    });
  }
});






userRouter.post("/calculate", async (req, res) => {
  const { amount, rate, year } = req.body;

  try {
    var maturityValue = amount * (((1 + rate) ** year - 1) / rate);
    var totalInvestAmount = amount * year;
    var gained = maturityValue - totalInvestAmount;

    res.send({
      investamount: totalInvestAmount,
      maturity: maturityValue,
      gained: gained,
    });
  } catch (error) {
    console.log({ err: err });
    res.send({
      success: false,
      error: error,
      msg: "check the entity Provided",
    });
  }
});

module.exports = {
  userRouter,
};