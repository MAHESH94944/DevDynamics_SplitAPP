const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/expenses", require("./routes/api/expenses"));
app.use("/api/settlements", require("./routes/api/settlements"));

const {
  getBalances,
  getPeople,
} = require("./controllers/settlementController");
app.get("/api/balances", getBalances);
app.get("/api/people", getPeople);

app.use(errorHandler);

module.exports = app;
