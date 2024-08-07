"use client";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { TodoProps } from "../ui/props";
import db from "../server/db";

const TodoContext = createContext<any>(null);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
	const [todos, setTodos] = useState<TodoProps[] | null>(null);
	const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const fetchAllFromDB = async () => {
		setIsLoading(true);
		try {
			const fetchedTodos = await db.get("/todos");
			setTodos(fetchedTodos.data);
		} catch (err) {
			console.log(err);
			setTodos([]); // Set to empty array on error
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchAllFromDB();
	}, []);

	const add = (title: string) => {
		const newTodo: TodoProps = {
			id: Date.now(),
			title: title,
			notes: "",
			isCompleted: false,
			isFavorite: false,
		};
		setTodos((prevTodos) => (prevTodos ? [...prevTodos, newTodo] : [newTodo]));
	};

	const edit = (id: number, title: string, notes: string) => {
		setTodos((prevTodos) => {
			return prevTodos
				? prevTodos.map((todo) =>
						todo.id === id ? { ...todo, title: title, notes: notes } : todo
				  )
				: null;
		});
	};

	const deleteTodo = (id: number) => {
		setTodos(todos && todos.filter((todo) => todo.id !== id));
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

	const handleToggleComplete = (id: number) => {
		setTodos((prevTodos) => {
			return prevTodos
				? prevTodos.map((todo) =>
						todo.id == id ? { ...todo, isCompleted: !todo.isCompleted } : todo
				  )
				: null;
		});
	};

	return (
		<TodoContext.Provider
			value={{
				todos,
				setTodos,
				add,
				handleToggleFavorite,
				handleToggleComplete,
				deleteTodo,
				edit,
				selectedTodoId,
				setSelectedTodoId,
				isLoading,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
};

export const useTodoContext = () => useContext(TodoContext);
