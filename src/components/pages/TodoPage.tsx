"use client";
import { ArrowRightCircleIcon } from "lucide-react";
import Todo from "../ui/Todo";
import { useTodoContext } from "@/lib/contexts/TodoContext";
import { TodoProps } from "@/lib/ui/props";
import { useState } from "react";

const TodoPage = () => {
	const { todos, add } = useTodoContext();
	const [title, setTitle] = useState<string>("");

	return (
		<>
			<div className="flex-1 space-y-4 custom-scrollbar overflow-y-auto">
				{todos &&
					todos.map((todoObj: TodoProps) => {
						return (
							<>
								<Todo
									id={todoObj.id}
									title={todoObj.title}
									notes={todoObj.notes}
									isCompleted={todoObj.isCompleted}
									isFavorite={todoObj.isFavorite}
								/>
							</>
						);
					})}
			</div>
			<div className="mt-auto">
				<div className="w-full h-[fit] relative">
					<form
						action="#"
						onSubmit={(e) => {
							e.preventDefault();
							add(title);
							setTitle("");
						}}
					>
						<input
							type="text"
							name="new-todo"
							id="new-todo"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="w-full bg-inherit border-b border-b-gray-300 focus:border-b-2 focus:border-b-white text-inherit font-light focus:font-bold dark:placeholder:text-gray-300 p-2 m-0 outline-none  placeholder:font-light"
							placeholder="Enter a new todo here..."
						/>
					</form>

					<p className="absolute p-2  right-0 top-1/2 transform -translate-y-1/2">
						<ArrowRightCircleIcon />
					</p>
				</div>
			</div>
		</>
	);
};

export default TodoPage;
