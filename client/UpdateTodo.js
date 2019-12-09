import React, { Component } from 'react';
import TodoForm from './TodoForm';
import axios from 'axios';

const defaultState = {
	taskName: '',
	assignee: '',
	errorMessage: '',
	warningMessage: '',
	initialized: false
};

export default class UpdateTodo extends Component {
	constructor() {
		super();
		this.state = defaultState;
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		const { taskName, assignee } = this.props.todo;
		this.setState({
			taskName,
			assignee,
			warningMessage: 'Field is required!'
			// note: it's preferable to only set the warning message here rather than hard-code it
			// as a prop so that we avoid "flashing" it when the component initially renders
		});
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	async handleSubmit(event) {
		event.preventDefault();
		const todoId = this.props.todo.id;
		try {
			const response = await axios.put(`/api/todos/${todoId}`, this.state);
			console.log('state', response);
			this.props.updateTodo(response.data);
			this.setState(defaultState);
		} catch (error) {
			this.setState({
				errorMessage: `There was a problem creating the todo: ${error.message}`
			});
		}
		// console.log('state', this.state);
	}

	render() {
		return <TodoForm todo={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />;
	}
}
