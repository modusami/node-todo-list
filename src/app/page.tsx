import TodoPage from "@/components/pages/TodoPage";
import Image from "next/image";

export default function Home() {
	return (
		<main className="min-h-screen p-2 md:p-24 flex flex-col items-center">
			{/* nav bar / title */}
			<nav className="mb-2">
				<h1>Todo List @React | @Node | @Postgres</h1>
			</nav>
			{/* todos */}
			<div className="flex-1">
				<TodoPage />
			</div>

			<footer className="mt-2">
				<b>Michael-Andre Odusami</b>
			</footer>
		</main>
	);
}
