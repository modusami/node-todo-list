"use client";
import React, { useState } from "react";
import { useTodoContext } from "@/lib/contexts/TodoContext";
import { ContextMenuProps, TodoComponentProps, TodoProps } from "@/lib/ui/props";
import { Star, MoreVertical, CircleCheck } from "lucide-react";

const TodoPopup = ({ onEdit, onDelete }: { onEdit: any; onDelete: any }) => {
	return (
		<div className="absolute top-8 right-2 w-24 text-[11px] uppercase bg-gray-200 dark:bg-gray-800 border dark:border-gray-700 border-gray-300 rounded-md shadow-sm z-10">
			<div
				className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
				onClick={onEdit}
			>
				<span>Edit</span>
			</div>
			<div
				className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
				onClick={onDelete}
			>
				<span>Delete</span>
			</div>
		</div>
	);
};

export default TodoPopup;
