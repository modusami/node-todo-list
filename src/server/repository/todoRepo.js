const { pool } = require("../config/db.config");

const now = new Date(new Date().toISOString());
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
	create: async (todo) => {
		const query = `INSERT INTO todos (title, notes, iscompleted, isfavorite, created_at, updated_at)
					VALUES ($1, $2, FALSE, FALSE, $3, $4) 
					RETURNING *;`;

		const result = await pool.query(query, [todo.title, "", now, now]);
		return result.rows[0];
	},
	update: async (todo) => {
		const query = `UPDATE todos 
					SET title=$1, notes=$2, iscompleted=$3, isfavorite=$4, updated_at=$5
					WHERE id=$6 RETURNING *`;
		const result = await pool.query(query, [
			todo.title,
			todo.notes,
			todo.iscompleted,
			todo.isfavorite,
			now,
			todo.id,
		]);
		return result.rows[0];
	},
};

module.exports = {
	todoRepository,
};
