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

	const saveTodo = async (todo: TodoProps | Object) => {
		try {
			const response = await db.post("/todos/save", todo);
			return response.data;
		} catch (err) {
			console.error("Error saving todo:", err);
			return null;
		}
	};

	const add = async (title: string) => {
		const newTodo = {
			title: title,
			notes: "",
			iscompleted: false,
			isfavorite: false,
		};
		const savedTodo = await saveTodo(newTodo);
		if (savedTodo) {
			setTodos((prevTodos) => (prevTodos ? [...prevTodos, savedTodo] : [savedTodo]));
		}
	};

	const edit = async (id: number, title: string, notes: string) => {
		const todoToUpdate = todos?.find((todo) => todo.id === id);
		if (todoToUpdate) {
			const updatedTodo = { ...todoToUpdate, title, notes };
			const savedTodo = await saveTodo(updatedTodo);
			if (savedTodo) {
				setTodos((prevTodos) => {
					return prevTodos
						? prevTodos.map((todo) => (todo.id === id ? savedTodo : todo))
						: null;
				});
			}
		}
	};

	const deleteTodo = async (id: number) => {
		try {
			await db.delete(`/todos/${id}`);
			setTodos(todos && todos.filter((todo) => todo.id !== id));
		} catch (err) {
			console.error("Error deleting todo:", err);
		}
	};

	const handleToggleFavorite = async (id: number) => {
		const todoToUpdate = todos?.find((todo) => todo.id === id);
		if (todoToUpdate) {
			const updatedTodo = { ...todoToUpdate, isfavorite: !todoToUpdate.isfavorite };
			const savedTodo = await saveTodo(updatedTodo);
			if (savedTodo) {
				setTodos((prevTodos) => {
					return prevTodos
						? prevTodos.map((todo) => (todo.id === id ? savedTodo : todo))
						: null;
				});
			}
		}
	};

	const handleToggleComplete = async (id: number) => {
		const todoToUpdate = todos?.find((todo) => todo.id === id);
		console.log(todoToUpdate);
		if (todoToUpdate) {
			const updatedTodo = { ...todoToUpdate, iscompleted: !todoToUpdate.iscompleted };
			const savedTodo = await saveTodo(updatedTodo);
			if (savedTodo) {
				setTodos((prevTodos) => {
					return prevTodos
						? prevTodos.map((todo) => (todo.id === id ? savedTodo : todo))
						: null;
				});
			}
		}
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
