import TodoPage from "@/components/pages/TodoPage";
import { TodoProvider } from "@/lib/contexts/TodoContext";
import Image from "next/image";

export default function Home() {
	return (
		<main className="min-h-screen flex flex-col">
			{/* todos */}
			<section className="flex flex-grow ">
				<TodoProvider>
					<div className=" w-[20%]"></div>
					<div className="flex-grow flex w-full mx-auto space-x-4 pr-10">
						<TodoPage />
					</div>
				</TodoProvider>
			</section>

			{/* <footer className="text-sm text-center mt-5">
				<p>Michael-Andre Odusami - Made with TS, Next.JS, React, Postgres, Node.JS</p>
			</footer> */}
		</main>
	);
}
