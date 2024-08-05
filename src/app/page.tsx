import TodoPage from "@/components/pages/TodoPage";
import Image from "next/image";

export default function Home() {
	return (
		<main className="min-h-screen p-2 flex flex-col">
			{/* nav bar / title */}
			<nav className="mb-4">
				<h1>Todo List @React | @Node | @Postgres</h1>
			</nav>
			{/* todos */}
			<div className="flex-grow flex flex-col w-full md:w-[70%] mx-auto">
				<TodoPage />
			</div>

			<footer className="mt-4">
				<b>Michael-Andre Odusami</b>
			</footer>
		</main>
	);
}
