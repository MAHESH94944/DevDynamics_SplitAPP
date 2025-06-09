const express = require("express");
const router = express.Router();
const {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} = require("../../controllers/expenseController");
const {
  calculateBalances,
  minimizeTransactions,
} = require("../../utils/settlement");
const Expense = require("../../models/Expense");

// GET /api/expenses/all - return all data (expenses, people, balances, settlements)
router.get("/all", async (req, res, next) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    // Get all people
    const peopleSet = new Set();
    expenses.forEach((exp) => {
      if (exp.paid_by) peopleSet.add(exp.paid_by);
      exp.splits.forEach((split) => peopleSet.add(split.person));
    });
    const people = Array.from(peopleSet);
    // Get balances and settlements
    const balances = calculateBalances(expenses);
    const settlements = minimizeTransactions(balances);

    res.json({
      success: true,
      data: {
        expenses,
        people,
        balances,
        settlements,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.route("/").post(addExpense).get(getExpenses);

router.route("/:id").put(updateExpense).delete(deleteExpense);

module.exports = router;
