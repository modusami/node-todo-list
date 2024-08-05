"use client";
import { ArrowRightCircleIcon } from "lucide-react";
import Todo from "../ui/Todo";
import { TodoProps } from "@/lib/ui/props";
import { useState } from "react";

const fake_todos: TodoProps[] = [
	{
		id: 0,
		title: "My First Todo",
		notes: "This is my first todo ever made",
		isCompleted: false,
		isFavorite: false,
	},
	{
		id: 1,
		title: "Register For Virginia Tech Courses",
		notes: "Need to take CS 2104 ASAP, but look for another tech based course I can potentially take at tech that is actually meaningful. No BS classes such as sociology and such.",
		isCompleted: false,
		isFavorite: true,
	},
	{
		id: 3,
		title: "Garbage Needs To Be Carried Out",
		notes: "take it out at 10:00AM",
		isCompleted: false,
		isFavorite: true,
	},
];

const TodoPage = () => {
	const [todos, setTodos] = useState<TodoProps[] | null>(fake_todos);

	return (
		<>
			<div className="flex-1 space-y-4 custom-scrollbar overflow-y-auto">
				{todos &&
					todos.map((todoObj) => {
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
