import axios from "axios";
const endpoint = process.env.NEXT_PUBLIC_DB_ENDPOINT as string;

console.log("DB_ENDPOINT:", endpoint);

if (!endpoint) {
	throw new Error("DB_ENDPOINT is not defined in the environment variables");
}
const db = axios.create({
	baseURL: endpoint,
});

export default db;
