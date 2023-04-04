const { Router } = require("express");
const { CalculateModel } = require("../model/CalculateModel");

const router = Router();

router.post("/calculate", async (req, res) => {
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
module.exports = { router };