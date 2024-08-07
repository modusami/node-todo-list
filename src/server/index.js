require("dotenv").config();
const express = require("express");
const app = express();
const port = 8080;

const { pool } = require("./config/db.config");

app.get("/todos", async (req, res) => {
	try {
		const result = await pool.query("SELECT * FROM todos");
		res.json(result.rows);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Internal server error" });
	}
});

app.listen(port, () => {
	console.log(`Listening on Port ${port}`);
});

// GOAL: (NO SEQUELIZE)
/**
 * create todo table in postgres (DONE)
 * connect postgres to backend
 * setup node and express to connect to the todo table
 * read values from the table
 *
 */
