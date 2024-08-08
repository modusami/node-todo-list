const express = require("express");
const router = express.Router();
const { todoRepository } = require("../repository/todoRepo");
const e = require("express");

router.get("/:id", async (req, res) => {
	try {
		const todo = await todoRepository.findById(req.params.id); // request paramteers
		console.log(todo);
		if (todo) {
			return res.json(todo);
		} else {
			res.status(404).json({ message: "Todo Not Found" });
		}
	} catch (err) {
		res.status(500).json({ message: "Server Error", error: err.message });
	}
});

router.get("/", async (req, res) => {
	try {
		const result = await todoRepository.findAll();
		if (result) {
			res.json(result.rows);
		} else {
			res.status(404).json({ message: "No todos exist in the database" });
		}
	} catch (err) {
		res.status(500).json({ message: "Server error", error: err.message });
	}
});

router.post("/save", async (req, res) => {
	try {
		const todo = req.body;

		console.log(req.params);
		console.log(req.body);
		console.log(todo);

		if (!todo || !todo.id || !todo.title) {
			return res.status(400).json({ message: "Invalid todo data" });
		}

		const result = await todoRepository.save(todo.id, todo);

		if (result) {
			res.json(result);
		} else {
			res.status(404).json({ message: "Failed to save todo" });
		}
	} catch (err) {
		console.error("Error saving todo:", err);
		res.status(500).json({ message: "Server error" });
	}
});

module.exports = router;
