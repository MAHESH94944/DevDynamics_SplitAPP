const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors"); // <-- Add this line
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

connectDB();

app.use(express.json());
app.use(cors()); // <-- Add this line

app.use("/api/expenses", require("./routes/api/expenses"));
app.use("/api/settlements", require("./routes/api/settlements"));

app.use(errorHandler);

module.exports = app;
