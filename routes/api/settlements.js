const express = require("express");
const router = express.Router();
const { getSettlements } = require("../../controllers/settlementController");

router.get("/", getSettlements);

module.exports = router;
