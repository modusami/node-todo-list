import Todo from "../ui/Todo";

const TodoPage = () => {
	return (
		<section className="mt-10 mb-5">
			<div>
				<Todo
					id={0}
					title={"First Todo"}
					notes={"This is my very own first todo"}
					isCompleted={true}
					isFavorite={true}
				/>
			</div>
		</section>
	);
};

export default TodoPage;
