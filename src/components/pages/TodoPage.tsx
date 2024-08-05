import Todo from "../ui/Todo";

const TodoPage = () => {
	return (
		<section className="mt-10 mb-5">
			<div className="space-y-3 h-[500px] overflow-y-scroll custom-scrollbar">
				<Todo
					id={0}
					title={"First Todo"}
					notes={"This is my very own first todo"}
					isCompleted={true}
					isFavorite={true}
				/>
				<Todo
					id={1}
					title={"Register For Virginia Tech Courses"}
					notes={
						"Need to take CS 2104 ASAP, but look for another tech based course I can potentially take at tech that is actually meaningful. No BS classes such as sociology and such."
					}
					isCompleted={true}
					isFavorite={true}
				/>

				<Todo
					id={0}
					title={"First Todo"}
					notes={"This is my very own first todo"}
					isCompleted={true}
					isFavorite={true}
				/>
				<Todo
					id={1}
					title={"Register For Virginia Tech Courses"}
					notes={
						"Need to take CS 2104 ASAP, but look for another tech based course I can potentially take at tech that is actually meaningful. No BS classes such as sociology and such."
					}
					isCompleted={true}
					isFavorite={true}
				/>

				<Todo
					id={0}
					title={"First Todo"}
					notes={"This is my very own first todo"}
					isCompleted={true}
					isFavorite={true}
				/>
				<Todo
					id={1}
					title={"Register For Virginia Tech Courses"}
					notes={
						"Need to take CS 2104 ASAP, but look for another tech based course I can potentially take at tech that is actually meaningful. No BS classes such as sociology and such."
					}
					isCompleted={true}
					isFavorite={true}
				/>

				<Todo
					id={0}
					title={"First Todo"}
					notes={"This is my very own first todo"}
					isCompleted={true}
					isFavorite={true}
				/>
				<Todo
					id={1}
					title={"Register For Virginia Tech Courses"}
					notes={
						"Need to take CS 2104 ASAP, but look for another tech based course I can potentially take at tech that is actually meaningful. No BS classes such as sociology and such."
					}
					isCompleted={true}
					isFavorite={true}
				/>
			</div>
		</section>
	);
};

export default TodoPage;
