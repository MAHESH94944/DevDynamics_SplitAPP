const express = require("express");
const router = express.Router();
const {
  getSettlements,
  getBalances,
  getPeople,
} = require("../../controllers/settlementController");

router.get("/", getSettlements);
router.get("/balances", getBalances);
router.get("/people", getPeople);

module.exports = router;
