import { Star, Circle, EllipsisIcon } from "lucide-react";
interface TodoProps {
	id: number;
	title: string;
	notes: string;
	isCompleted: boolean;
	isFavorite: boolean;
}

const Todo: React.FC<TodoProps> = ({ id, title, notes, isCompleted, isFavorite }) => {
	return (
		<>
			<div className="relative flex flex-col items-start min-w-[400px] max-w-[600px] p-2 border dark:border-gray-300 border-black-300 rounded-md">
				<p className="text-xl g:text-2xl mb-2.5">{title}</p>
				<p className="text-sm md:text-md mb-5">{notes}</p>
				<div className="flex space-x-4">
					<p>
						<Circle
							className={`w-[20px] h-[20px] cursor-pointer${
								isCompleted ? "bg-green-600" : "bg-inherit"
							}`}
						/>
					</p>
					<p>
						<Star
							className={`w-[20px] h-[20px] cursor-pointer ${
								isFavorite ? "bg-yellow-500" : "bg-inherit"
							}`}
						/>
					</p>
				</div>
				<div className="absolute top-2 right-2">
					<EllipsisIcon className="cursor-pointer" />
				</div>
			</div>
		</>
	);
};

export default Todo;
