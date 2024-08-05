"use client";
import { ArrowDown, ArrowRight, ArrowRightCircleIcon } from "lucide-react";
import Todo from "../ui/Todo";
import { useTodoContext } from "@/lib/contexts/TodoContext";
import { TodoProps } from "@/lib/ui/props";
import { useState, useMemo } from "react";

const TodoPage = () => {
	const {
		todos,
		add,
		handleToggleFavorite,
		handleToggleComplete,
		deleteTodo,
		edit,
		selectedTodoId,
		setSelectedTodoId,
	} = useTodoContext();

	// not rlly used for now
	const regularTodos = useMemo(() => {
		return todos ? todos.filter((todo: TodoProps) => !todo.isCompleted) : null;
	}, [todos]);

	const completedTodos = useMemo(() => {
		return todos
			? todos.filter(
					(todo: TodoProps) => todo.isCompleted || (todo.isCompleted && todo.isFavorite)
			  )
			: null;
	}, [todos]);

	const [title, setTitle] = useState<string>("");
	const currentSelectedTodo = useMemo(() => {
		return todos ? todos.find((todo: TodoProps) => todo.id === selectedTodoId) : null;
	}, [selectedTodoId]);
	const [showRegularTodos, setShowRegularTodos] = useState<boolean>(true);
	const [showCompletedTodos, setShowCompletedTodos] = useState<boolean>(true);

	return (
		<>
			<div
				className="flex-col flex flex-1"
				onClick={(e) => {
					setSelectedTodoId(null);
				}}
			>
				<div className="space-y-4 custom-scrollbar overflow-y-auto">
					<div>
						<div
							className="flex uppercase text-xs w-fit justify-center items-center space-x-2 cursor-pointer mb-3 dark:bg-[#353535] p-2 rounded-sm"
							onClick={(e) => {
								e.stopPropagation();
								setShowRegularTodos(!showRegularTodos);
							}}
						>
							<h1>Todos</h1>
							<span>
								{showRegularTodos ? (
									<ArrowDown className="h-3 w-3" />
								) : (
									<ArrowRight className="h-3 w-3" />
								)}
							</span>
							<span>
								{regularTodos &&
									regularTodos.length > 0 &&
									regularTodos.length + " items"}
							</span>
						</div>
						<div className="space-y-1">
							{todos &&
								showRegularTodos &&
								todos
									.filter((todo: TodoProps) => !todo.isCompleted)
									.map((todoObj: TodoProps) => (
										<Todo
											key={todoObj.id}
											{...todoObj}
											toggleFavorite={handleToggleFavorite}
											toggleComplete={handleToggleComplete}
											deleteTodo={deleteTodo}
											edit={edit}
										/>
									))}
						</div>
					</div>

					<div>
						<div
							className="flex uppercase text-xs w-fit justify-center items-center space-x-2 cursor-pointer mb-3 dark:bg-[#353535] p-2 rounded-sm"
							onClick={(e) => {
								e.stopPropagation();
								setShowCompletedTodos(!showCompletedTodos);
							}}
						>
							<h1>Completed</h1>
							<span>
								{showCompletedTodos ? (
									<ArrowDown className="h-3 w-3" />
								) : (
									<ArrowRight className="h-3 w-3" />
								)}
							</span>
							<span>
								{completedTodos &&
									completedTodos.length > 0 &&
									completedTodos.length + " items"}
							</span>
						</div>
						<div className="space-y-1">
							{todos &&
								showCompletedTodos &&
								todos
									.filter(
										(todo: TodoProps) =>
											todo.isCompleted ||
											(todo.isCompleted && todo.isFavorite)
									)
									.map((todoObj: TodoProps) => (
										<Todo
											key={todoObj.id}
											{...todoObj}
											toggleFavorite={handleToggleFavorite}
											toggleComplete={handleToggleComplete}
											deleteTodo={deleteTodo}
											edit={edit}
										/>
									))}
						</div>
					</div>
				</div>

				<div className="mt-auto">
					<div className="w-full h-[fit] relative">
						<form
							className="space-y-2"
							action="#"
							onSubmit={(e) => {
								if (title.length > 0) {
									e.preventDefault();
									add(title);
									setTitle("");
								}
							}}
						>
							<input
								type="text"
								name="newTitle"
								id="newTitle"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								className="w-full bg-inherit border-b border-b-gray-300 focus:border-b-2 focus:border-b-white text-inherit font-light focus:font-bold dark:placeholder:text-gray-300 p-2 m-0 outline-none  placeholder:font-light"
								placeholder="Enter a new todo here..."
							/>

							<p className="absolute p-2 right-0 bottom-0">
								<ArrowRightCircleIcon
									className="cursor-pointer"
									onClick={(e) => {
										e.preventDefault();
										add(title);
										setTitle("");
									}}
								/>
							</p>
						</form>
					</div>
				</div>
			</div>
			{currentSelectedTodo && (
				<div className="w-[30%] min-h-full dark:bg-[#303030] bg-slate-100 p-2">
					<h1 className="font-bold">{currentSelectedTodo.title}</h1>
				</div>
			)}
		</>
	);
};

export default TodoPage;
