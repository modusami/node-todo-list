"use client";
import { useState } from "react";
import { useTodoContext } from "@/lib/contexts/TodoContext";
import { TodoComponentProps, TodoProps } from "@/lib/ui/props";
import { Star, EllipsisIcon, CircleCheck, MoreVertical } from "lucide-react";
import TodoPopup from "../pieces/TodoPopup";

const Todo: React.FC<TodoComponentProps> = ({
	id,
	title,
	notes,
	isCompleted,
	isFavorite,
	toggleFavorite,
	toggleComplete,
	deleteTodo,
}) => {
	const [showPopup, setShowPopup] = useState(false);

	const handleEdit = () => {
		// Implement edit functionality
		setShowPopup(false);
	};

	const handleDelete = () => {
		deleteTodo(id);
		setShowPopup(false);
	};

	return (
		<>
			<div className="relative flex justify-center items-start p-2 border dark:border-gray-300 border-black-300 rounded-md">
				<p className="mr-3 flex items-center justify-center">
					<CircleCheck
						className={`w-[20px] h-[20px] cursor-pointer ${
							isCompleted ? "fill-green-400 text-black" : "bg-inherit"
						}`}
						onClick={() => toggleComplete(id)}
					/>
				</p>
				<p className="text-sm flex-1">{title}</p>
				{/* <p className="text-sm mb-2">{notes}</p> */}

				<p className="ml-3 flex justify-center items-center">
					<Star
						className={`w-[20px] h-[20px] cursor-pointer ${
							isFavorite ? "fill-yellow-400 text-yellow-400" : "bg-inherit"
						}`}
						onClick={() => toggleFavorite(id)}
					/>
				</p>
				<div className="flex justify-center items-center">
					<MoreVertical
						className="cursor-pointer"
						onClick={() => setShowPopup(!showPopup)}
					/>
				</div>
				{showPopup && <TodoPopup onEdit={handleEdit} onDelete={handleDelete} />}
			</div>
		</>
	);
};

export default Todo;
