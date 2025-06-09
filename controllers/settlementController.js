const Expense = require("../models/Expense");
const {
  calculateBalances,
  minimizeTransactions,
} = require("../utils/settlement");

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

exports.getBalances = asyncHandler(async (req, res, next) => {
  const expenses = await Expense.find();
  if (!expenses || expenses.length === 0) {
    return res
      .status(200)
      .json({ success: true, data: {}, message: "No balances to show" });
  }
  const balances = calculateBalances(expenses);
  res.status(200).json({ success: true, data: balances });
});

exports.getPeople = asyncHandler(async (req, res, next) => {
  const expenses = await Expense.find();
  if (!expenses || expenses.length === 0) {
    return res
      .status(200)
      .json({ success: true, data: [], message: "No people found" });
  }
  const peopleSet = new Set();
  expenses.forEach((exp) => {
    peopleSet.add(exp.paid_by);
    exp.splits.forEach((split) => peopleSet.add(split.person));
  });
  res.status(200).json({ success: true, data: Array.from(peopleSet) });
});


exports.getSettlements = asyncHandler(async (req, res, next) => {
  const expenses = await Expense.find();
  if (!expenses || expenses.length === 0) {
    return res
      .status(200)
      .json({ success: true, data: [], message: "No settlements to show" });
  }
  const balances = calculateBalances(expenses);
  const settlements = minimizeTransactions(balances);
  res.status(200).json({ success: true, data: settlements });
});

