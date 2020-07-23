import React, { Component } from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import Labels from './Labels'

export default class Todo extends Component {
    state = {
        todos: []
    }

    addTodo = (todo) => {
        let item = {
            title: todo,
            id: this.state.todos.length + 1,
            isCompleted: false
        }
        this.setState({
            todos: [...this.state.todos, item]
        })
    }

    markAsComplete = (id) => {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === id) {
                    todo.isCompleted = !todo.isCompleted;
                }
                return todo;
        })
        })
    }

    deleteTodo = (id) => {
        this.setState({
            todos: [...this.state.todos.filter(todo => {
                return todo.id !== id;
            })]
        })
    }

    componentDidUpdate = () => {
        localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }

    componentWillMount = () => {
        let todos = localStorage.getItem('todos');
        if(todos) {
            this.setState({
                todos: JSON.parse(todos)
            })
        }
    }

    render() {
        return (
            <div className="todo-main">
                <div className="todo-title">React Todo App</div>
                <TodoForm addTodo = {this.addTodo} />
                {this.state.todos.length>0 && 
                <div>Select an item to mark it as complete</div>
                }
                {this.state.todos.length === 0 && 
                <div>No task pending. Add new task!</div>
                }
                <TodoList 
                todos={this.state.todos} 
                markAsComplete = {this.markAsComplete}
                deleteTodo = {this.deleteTodo}
                />
                <Labels />
            </div>
        )
    }
}
