"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTodoContext } from "@/lib/contexts/TodoContext";
import { ContextMenuProps, TodoComponentProps, TodoProps } from "@/lib/ui/props";
import { Star, Circle, MoreVertical, CheckIcon } from "lucide-react";
import TodoPopup from "../pieces/TodoPopup";
import { inter } from "@/lib/util/fonts";

const Todo: React.FC<TodoComponentProps> = ({
	id,
	title,
	notes,
	iscompleted,
	isfavorite,
	toggleFavorite,
	toggleComplete,
	deleteTodo,
	edit,
}) => {
	const { setSelectedTodoId, selectedTodoId } = useTodoContext();

	const [showPopup, setShowPopup] = useState(false);
	const [menuPosition, setMenuPosition] = useState<ContextMenuProps>({ x: 0, y: 0 });

	const handleContextMenu = useCallback(
		(event: React.MouseEvent) => {
			event.preventDefault();
			setSelectedTodoId(id);
			setShowPopup(true);
			setMenuPosition({ x: event.clientX, y: event.clientY });
		},
		[id, setSelectedTodoId]
	);

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
				className={`relative flex justify-center items-start p-2 border dark:border-gray-300 border-black-300 rounded-sm  ${
					selectedTodoId === id ? "dark:bg-[#545454]" : "dark:bg-[#303030]"
				}`}
				onClick={(e) => {
					e.stopPropagation();
					setSelectedTodoId(id);
				}}
				onContextMenu={handleContextMenu}
			>
				<p className="mr-3 flex items-center justify-center">
					<Circle
						className={`w-[20px] h-[20px] cursor-pointer ${
							iscompleted ? "fill-green-400 text-green-400 " : "bg-inherit"
						}`}
						onClick={(e) => {
							e.stopPropagation();
							toggleComplete(id);
						}}
					/>
				</p>
				<p
					className={`text-sm flex-1 ${
						iscompleted ? "line-through dark:text-[#959595]" : ""
					}`}
				>
					{title}
				</p>
				{/* <p className="text-sm mb-2">{notes}</p> */}

				<p className="ml-3 flex justify-center items-center">
					<Star
						className={`w-[20px] h-[20px] cursor-pointer ${
							isfavorite ? "fill-yellow-400 text-yellow-400" : "bg-inherit"
						}`}
						onClick={(e) => {
							e.stopPropagation();
							toggleFavorite(id);
						}}
					/>
				</p>
			</div>
			{showPopup && selectedTodoId === id && (
				<>
					<div
						className="absolute p-2 text-[12px] w-fit h-fit z-10 bg-black"
						style={{ top: menuPosition.y, left: menuPosition.x }}
					>
						<ul className="p-0 m-0 list-none flex flex-col space-y-2">
							<li
								className="cursor-pointer hover:bg-[#202020]"
								onClick={(e) => {
									toggleComplete(id);
								}}
							>
								{!iscompleted ? "Mark as Completed" : "Mark as Uncompleted"}
							</li>
							<li
								className="cursor-pointer hover:bg-[#202020]"
								onClick={(e) => {
									toggleFavorite(id);
								}}
							>
								{!isfavorite ? "Mark as Favorite" : "Mark as Unfavorite"}
							</li>
							<li
								className="cursor-pointer hover:bg-[#202020]"
								onClick={(e) => {
									handleDelete();
								}}
							>
								Delete
							</li>
						</ul>
					</div>
				</>
			)}
		</>
	);
};

export default Todo;
