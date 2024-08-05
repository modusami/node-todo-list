"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { TodoProps } from "../ui/props";

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

const TodoContext = createContext<any>(null);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
	const [todos, setTodos] = useState<TodoProps[] | null>(fake_todos);

	const add = (title: string, notes: string) => {
		const newTodo: TodoProps = {
			id: Date.now(),
			title: title,
			notes: notes,
			isCompleted: false,
			isFavorite: false,
		};
		setTodos((prevTodos) => (prevTodos ? [...prevTodos, newTodo] : [newTodo]));
	};

	const handleToggleFavorite = (id: number) => {
		setTodos((prevTodos) => {
			return prevTodos
				? prevTodos.map((todo) =>
						todo.id == id ? { ...todo, isFavorite: !todo.isFavorite } : todo
				  )
				: null;
		});
	};

	return (
		<TodoContext.Provider value={{ todos, setTodos, add, handleToggleFavorite }}>
			{children}
		</TodoContext.Provider>
	);
};

export const useTodoContext = () => useContext(TodoContext);
