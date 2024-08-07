const { pool } = require("../config/db.config");

const todoRepository = {
	findById: async (id) => {
		const query = "SELECT * FROM todos WHERE id = $1";
		const result = await pool.query(query, [id]);
		return result.rows[0];
	},
	findAll: async () => {
		const query = "SELECT * FROM todos";
		const result = await pool.query(query);
		return result;
	},
};

module.exports = {
	todoRepository,
};
