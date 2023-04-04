const mongoose = require("mongoose");
const calculateSchema = mongoose.Schema(
  {
    amount: { type: Number, required: true },

    rate: { type: Number, required: true },
    year: { type: Number, required: true },
  },
  {
    versionKey: false,
  }
);

const CalculateModel = mongoose.model("Calculatedata", calculateSchema);

module.exports = {
  CalculateModel,
};