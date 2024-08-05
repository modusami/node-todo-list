import TodoPage from "@/components/pages/TodoPage";
import { TodoProvider } from "@/lib/contexts/TodoContext";
import Image from "next/image";

export default function Home() {
	return (
		<main className="min-h-screen p-2 flex flex-col">
			{/* nav bar / title */}
			<nav className="mb-4">
				<h1>Todo List @React | @Node | @Postgres</h1>
			</nav>
			{/* todos */}
			<TodoProvider>
				<div className="flex-grow flex flex-col w-full md:w-[70%] mx-auto">
					<TodoPage />
				</div>
			</TodoProvider>

			<footer className="mt-4">
				<b>Michael-Andre Odusami</b>
			</footer>
		</main>
	);
}
