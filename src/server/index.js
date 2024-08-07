require("dotenv").config();
const express = require("express");
const app = express();
const todoRoutes = require("./routes/todoRoutes");
const port = 8080;

const { pool } = require("./config/db.config");

app.use("/todos", todoRoutes);

app.listen(port, () => {
	console.log(`Listening on Port ${port}`);
});
