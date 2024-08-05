import { ArrowRightCircleIcon } from "lucide-react";
import Todo from "../ui/Todo";

const TodoPage = () => {
	return (
		<>
			<div className="flex-1 space-y-4 custom-scrollbar overflow-y-auto">
				<Todo
					id={0}
					title={"First Todo"}
					notes={"This is my very own first todo"}
					isCompleted={true}
					isFavorite={true}
				/>
				<Todo
					id={1}
					title={"Register For Virginia Tech Courses"}
					notes={
						"Need to take CS 2104 ASAP, but look for another tech based course I can potentially take at tech that is actually meaningful. No BS classes such as sociology and such."
					}
					isCompleted={true}
					isFavorite={true}
				/>
			</div>
			<div className="mt-auto">
				<div className="w-full h-[fit] relative">
					<input
						type="text"
						name="new-todo"
						id="new-todo"
						className="w-full bg-inherit border-b border-b-gray-300 focus:border-b-2 focus:border-b-white text-inherit font-light focus:font-bold dark:placeholder:text-gray-300 p-2 m-0 outline-none  placeholder:font-light"
						placeholder="Enter a new todo here..."
					/>
					<p className="absolute p-2  right-0 top-1/2 transform -translate-y-1/2">
						<ArrowRightCircleIcon />
					</p>
				</div>
			</div>
		</>
	);
};

export default TodoPage;
