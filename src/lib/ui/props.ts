export interface TodoProps {
	id: number;
	title: string;
	notes: string;
	isCompleted: boolean;
	isFavorite: boolean;
}

export interface TodoComponentProps extends TodoProps {
	toggleFavorite: (id: number) => void;
	toggleComplete: (id: number) => void;
	deleteTodo: (id: number) => void;
}
