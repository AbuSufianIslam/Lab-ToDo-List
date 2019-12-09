import React from 'react';

const TodoForm = (props) => {
	const { todo, handleChange, handleSubmit } = props;
	return (
		<form id="todo-form" onSubmit={handleSubmit}>
			<label htmlFor="taskName">
				Task Name:{!todo.taskName &&
				todo.warningMessage && <span className="warning">{todo.warningMessage}</span>}
			</label>
			<input type="text" name="taskName" value={todo.taskName} onChange={handleChange} />
			<label htmlFor="assignee">
				Assign To:{!todo.assignee &&
				todo.warningMessage && <span className="warning">{todo.warningMessage}</span>}
			</label>
			<input type="text" name="assignee" value={todo.assignee} onChange={handleChange} />
			<button type="submit" disabled={!todo.taskName || !todo.assignee}>
				Submit
			</button>
			{todo.errorMessage && <div className="error">{todo.errorMessage}</div>}
		</form>
	);
};

export default TodoForm;
