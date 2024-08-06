"use client";
import { useEffect, useRef, useState } from "react";
import { useTodoContext } from "@/lib/contexts/TodoContext";
import { TodoComponentProps, TodoProps } from "@/lib/ui/props";
import { Star, Circle, MoreVertical, CheckIcon } from "lucide-react";
import TodoPopup from "../pieces/TodoPopup";
import { inter } from "@/lib/util/fonts";

const Todo: React.FC<TodoComponentProps> = ({
	id,
	title,
	notes,
	isCompleted,
	isFavorite,
	toggleFavorite,
	toggleComplete,
	deleteTodo,
	edit,
}) => {
	const { setSelectedTodoId } = useTodoContext();

	const [showPopup, setShowPopup] = useState(false);

	const handleEdit = () => {
		setShowPopup(false);
	};

	const handleDelete = () => {
		deleteTodo(id);
		setShowPopup(false);
	};

	return (
		<>
			<div
				className="relative flex justify-center items-start p-2 border dark:border-gray-300 border-black-300 rounded-sm dark:bg-[#303030]"
				onClick={(e) => {
					e.stopPropagation();
					setSelectedTodoId(id);
				}}
			>
				<p className="mr-3 flex items-center justify-center">
					<Circle
						className={`w-[20px] h-[20px] cursor-pointer ${
							isCompleted ? "fill-green-400 text-green-400 " : "bg-inherit"
						}`}
						onClick={(e) => {
							e.stopPropagation();
							toggleComplete(id);
						}}
					/>
				</p>
				<p
					className={`text-sm flex-1 ${
						isCompleted ? "line-through dark:text-[#959595]" : ""
					}`}
				>
					{title}
				</p>
				{/* <p className="text-sm mb-2">{notes}</p> */}

				<p className="ml-3 flex justify-center items-center">
					<Star
						className={`w-[20px] h-[20px] cursor-pointer ${
							isFavorite ? "fill-yellow-400 text-yellow-400" : "bg-inherit"
						}`}
						onClick={(e) => {
							e.stopPropagation();
							toggleFavorite(id);
						}}
					/>
				</p>
				<div className="flex justify-center items-center">
					<MoreVertical
						className="cursor-pointer"
						onClick={(e) => {
							e.stopPropagation();
							setShowPopup(!showPopup);
						}}
					/>
				</div>
				{showPopup && <TodoPopup onEdit={handleEdit} onDelete={handleDelete} />}
			</div>
		</>
	);
};

export default Todo;
