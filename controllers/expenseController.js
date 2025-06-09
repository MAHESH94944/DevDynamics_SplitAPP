const Expense = require("../models/Expense");
const { validateExpenseInput } = require("../utils/validation");
const mongoose = require("mongoose");

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

function isStringArray(arr) {
  return Array.isArray(arr) && arr.every((x) => typeof x === "string");
}

exports.addExpense = asyncHandler(async (req, res, next) => {
  let { amount, description, paid_by, split_type, splits } = req.body;

  // If split_type is "equal" and splits is missing or is an array of people (strings), auto-generate splits
  if (split_type === "equal" && (isStringArray(splits) || !splits)) {
    let peopleArr = splits;
    if (!Array.isArray(peopleArr) || !peopleArr.length) {
      // If not provided, default to paid_by only
      peopleArr = [paid_by];
    }
    const perPerson = Number((amount / peopleArr.length).toFixed(2));
    splits = peopleArr.map((person) => ({
      person: person.trim(),
      share: perPerson,
    }));
    req.body.splits = splits;
  }

  const error = validateExpenseInput({ ...req.body, splits });
  if (error) {
    res.status(400);
    return next(new Error(error));
  }

  const expense = await Expense.create({
    amount,
    description: description.trim(),
    paid_by: paid_by.trim(),
    split_type,
    splits,
  });
  res.status(201).json({
    success: true,
    data: expense,
    message: "Expense added successfully",
  });
});

exports.getExpenses = asyncHandler(async (req, res, next) => {
  const expenses = await Expense.find().sort({ createdAt: -1 });
  if (!expenses || expenses.length === 0) {
    res
      .status(200)
      .json({ success: true, data: [], message: "No expenses found" });
    return;
  }
  res.status(200).json({ success: true, data: expenses });
});

exports.updateExpense = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    return next(new Error("Invalid expense ID"));
  }
  const error = validateExpenseInput(req.body);
  if (error) {
    res.status(400);
    return next(new Error(error));
  }
  const updated = await Expense.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updated) {
    res.status(404);
    return next(new Error("Expense not found"));
  }
  res.json({ success: true, data: updated, message: "Expense updated" });
});

exports.deleteExpense = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    return next(new Error("Invalid expense ID"));
  }
  const deleted = await Expense.findByIdAndDelete(id);
  if (!deleted) {
    res.status(404);
    return next(new Error("Expense not found"));
  }
  res.json({ success: true, message: "Expense deleted" });
});
