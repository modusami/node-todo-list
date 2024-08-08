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
	save: async (id, todo) => {
		const now = new Date(new Date().toISOString());
		const query = `
        INSERT INTO todos (id, title, notes, iscompleted, isfavorite, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (id) DO UPDATE
        SET title = EXCLUDED.title,
            notes = EXCLUDED.notes,
            iscompleted = EXCLUDED.iscompleted,
            isfavorite = EXCLUDED.isfavorite,
            updated_at = EXCLUDED.updated_at
        RETURNING *;
    	`;
		const result = await pool.query(query, [
			id,
			todo.title,
			todo.notes,
			todo.iscompleted,
			todo.isfavorite,
			todo.created_at || now, // Use provided created_at or current time for new todos
			now, // Always update the updated_at timestamp
		]);
		return result.rows[0];
	},
};

module.exports = {
	todoRepository,
};
