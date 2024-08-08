"use client";
import { ArrowDown, ArrowRight, ArrowRightCircleIcon, Circle, Star } from "lucide-react";
import Todo from "../ui/Todo";
import { useTodoContext } from "@/lib/contexts/TodoContext";
import { TodoProps } from "@/lib/ui/props";
import { useState, useMemo } from "react";
import AutoResizeTextarea from "../pieces/AutoResizeTextArea";
import Loading from "./Loading";

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
		isLoading,
	} = useTodoContext();

	const regularTodos = todos ? todos.filter((todo: TodoProps) => !todo.iscompleted) : [];
	const completedTodos = todos
		? todos.filter(
				(todo: TodoProps) => todo.iscompleted || (todo.iscompleted && todo.isfavorite)
		  )
		: [];

	const [title, setTitle] = useState<string>("");
	const currentSelectedTodo = useMemo(() => {
		return todos ? todos.find((todo: TodoProps) => todo.id === selectedTodoId) : null;
	}, [selectedTodoId, todos]);
	const [showRegularTodos, setShowRegularTodos] = useState<boolean>(true);
	const [showCompletedTodos, setShowCompletedTodos] = useState<boolean>(true);
	const [editNotesMode, setEditNotesMode] = useState<boolean>(false);

	const onChangeCurrentSelectedTodoNotes = (text: string) => {
		if (currentSelectedTodo) {
			edit(currentSelectedTodo.id, currentSelectedTodo.title, text);
		}
	};

	if (isLoading) {
		return <Loading />;
	}

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
							<span>{regularTodos && regularTodos.length + " items"}</span>
						</div>
						<div className="space-y-1">
							{todos &&
								showRegularTodos &&
								todos
									.filter((todo: TodoProps) => !todo.iscompleted)
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
							<span>{completedTodos && completedTodos.length + " items"}</span>
						</div>
						<div className="space-y-1">
							{todos &&
								showCompletedTodos &&
								todos
									.filter(
										(todo: TodoProps) =>
											todo.iscompleted ||
											(todo.iscompleted && todo.isfavorite)
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

				<div className="mt-auto mb-5">
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
							<div className="flex justify-center items-center bg-[#404040] ">
								<input
									type="text"
									name="newTitle"
									id="newTitle"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									className="w-full flex-1 bg-inherit focus:border-b-white text-inherit font-light focus:font-bold dark:placeholder:text-gray-300 p-3 m-0 outline-none  placeholder:font-light"
									placeholder="Add task"
								/>

								<p className="w-[10%] flex justify-end pr-2 ">
									<ArrowRightCircleIcon
										className="cursor-pointer"
										onClick={(e) => {
											e.preventDefault();
											add(title);
											setTitle("");
										}}
									/>
								</p>
							</div>
						</form>
					</div>
				</div>
			</div>
			{currentSelectedTodo && (
				<div className="w-[30%] pt-8 px-4 min-h-full dark:bg-[#303030] bg-slate-100 p-2 flex flex-col">
					{/* header */}
					<div className="flex justify-center items-center">
						<p className="w-[10%]">
							<Circle
								className={`w-[20px] h-[20px] cursor-pointer ${
									currentSelectedTodo.iscompleted
										? "fill-green-400 text-green-400 "
										: "bg-inherit"
								}`}
								onClick={(e) => {
									e.stopPropagation();
									handleToggleComplete(currentSelectedTodo.id);
								}}
							/>
						</p>
						<div className="flex-1 flex items-center">
							<h1 className="font-bold text-start">{currentSelectedTodo.title}</h1>
						</div>

						<p className=" flex justify-center items-center">
							<Star
								className={`w-[20px] h-[20px] cursor-pointer ${
									currentSelectedTodo.isfavorite
										? "fill-yellow-400 text-yellow-400"
										: "bg-inherit"
								}`}
								onClick={(e) => {
									e.stopPropagation();
									handleToggleFavorite(currentSelectedTodo.id);
								}}
							/>
						</p>
					</div>
					{/* border */}
					<div className="h-[2px] my-5 dark:bg-[#7d7d7d]"></div>
					{/* extra todo functionalities */}
					<div
						onClick={(e) => {
							e.stopPropagation();
							setEditNotesMode(!editNotesMode);
						}}
					>
						<p>
							<form
								action="#"
								onSubmit={(e) => {
									e.preventDefault(); /* Handle form submission */
								}}
							>
								<AutoResizeTextarea
									value={currentSelectedTodo?.notes || ""}
									onChange={onChangeCurrentSelectedTodoNotes}
									className="border-none outline-none bg-inherit text-inherit"
								/>
							</form>
						</p>
					</div>

					<p
						className="text-start dark:text-[#adadad] mt-auto mb-2"
						onClick={(e) => {
							setSelectedTodoId(null);
						}}
					>
						<ArrowRight className="w-[20px] h-[20px]" />
					</p>
				</div>
			)}
		</>
	);
};

export default TodoPage;
