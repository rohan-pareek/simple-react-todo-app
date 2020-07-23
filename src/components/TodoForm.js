import React, { Component } from 'react'

export default class TodoForm extends Component {
    state = {
        todo: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.todo) {
            this.props.addTodo(this.state.todo);
            this.setState({
                todo: ''
            })
        }
    }

    render() {
        return (
                <form className = "todo-form" onSubmit = {this.handleSubmit}>
                    <label>Add a task</label>
                    <input 
                    type = "text" 
                    name = "todo"
                    autoComplete = "off"
                    placeholder = "Enter to submit"
                    value = {this.state.todo} 
                    onChange = {this.handleChange}
                    />
                </form>
        )
    }
}
