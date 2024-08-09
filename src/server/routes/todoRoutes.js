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

router.post("/create", async (req, res) => {
	try {
		const todo = req.body;
		if (!todo.title) {
			res.status(404).json({ message: "Title of todo must contain values." });
		}
		const result = await todoRepository.create(todo);

		if (result) {
			res.json(result);
		} else {
			res.status(404).json({ message: "Error creating todo" });
		}
	} catch (err) {
		console.error("Error saving todo:", err);
		res.status(500).json({ message: "Server error" });
	}
});

router.put("/update", async (req, res) => {
	try {
		const todo = req.body;
		if (!todo.id) {
			res.status(404).json({ message: "Todo has no ID" });
		}
		if (!todo.title) {
			res.status(404).json({ message: "Title of todo must contain values." });
		}
		const result = await todoRepository.update(todo);

		if (result) {
			res.json(result);
		} else {
			res.status(404).json({ message: "Error creating todo" });
		}
	} catch (err) {
		console.error("Error saving todo:", err);
		res.status(500).json({ message: "Server error" });
	}
});

router.delete("/delete/:id", async (req, res) => {
	console.log(req.body);
	try {
		const id = req.params.id;
		if (id) {
			const result = await todoRepository.delete(id);
			console.log(result);
			if (result.rowCount > 0) {
				res.json({ message: "Todo deleted successfully" });
			} else {
				res.status(404).json({ message: "Todo not found" });
			}
		} else {
			res.status(400).json({ message: "Todo ID is required" });
		}
	} catch (err) {
		console.error("Error deleting todo:", err);
		res.status(500).json({ message: "Server error | Error Deleting Todo" });
	}
});

module.exports = router;
