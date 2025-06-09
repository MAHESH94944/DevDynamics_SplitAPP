const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    paid_by: { type: String }, 
    split_type: {
      type: String,
      enum: ["equal", "percentage", "exact"],
      default: "equal",
    },
    splits: [
      {
        person: { type: String, required: true },
        share: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
