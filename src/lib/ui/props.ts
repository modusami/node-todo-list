export interface TodoProps {
	id: number;
	title: string;
	notes: string;
	iscompleted: boolean;
	isfavorite: boolean;
}

export interface TodoComponentProps extends TodoProps {
	toggleFavorite: (id: number) => void;
	toggleComplete: (id: number) => void;
	deleteTodo: (id: number) => void;
	edit: (id: number, title: string) => void;
}

export interface ContextMenuProps {
	x: number;
	y: number;
}
