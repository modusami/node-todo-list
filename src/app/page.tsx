import TodoPage from "@/components/pages/TodoPage";
import Image from "next/image";

export default function Home() {
	return (
		<main className="min-h-screen p-24 flex flex-col items-center">
			{/* nav bar / title */}
			<nav>
				<h1>Todo List @React | @Node | @Postgres</h1>
			</nav>
			{/* todos */}
			<div className="flex-1">
				<TodoPage />
			</div>

			<footer>
				<b>Michael-Andre Odusami</b>
			</footer>
		</main>
	);
}
