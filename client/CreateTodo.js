import React, { Component } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';

const defaultState = {
	taskName: '',
	assignee: '',
	errorMessage: ''
};

export default class CreateTodo extends Component {
	constructor() {
		super();
		this.state = defaultState;
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	async handleSubmit(event) {
		event.preventDefault();
		try {
			const response = await axios.post('/api/todos', this.state);
			console.log('state', response);
			this.props.addTodo(response.data);
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
