require("dotenv").config();
const express = require("express");
const app = express();
const todoRoutes = require("./routes/todoRoutes");
const port = 8080;

const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
	origin: "*",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	preflightContinue: false,
	optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use("/todos", todoRoutes);

app.listen(port, () => {
	console.log(`Listening on Port ${port}`);
});
