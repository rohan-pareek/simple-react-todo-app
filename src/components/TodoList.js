import React, { Component } from 'react'
import TodoItem from './TodoItem'

export default class TodoList extends Component {
    render() {
        let todos = this.props.todos.map(todo => (
            <TodoItem 
            key = {todo.id} 
            todo = {todo} 
            markAsComplete = {this.props.markAsComplete}
            deleteTodo = {this.props.deleteTodo}
            />
        ))
        return (
            <div className = "todo-list">
                {todos}
            </div>
        )
    }
}
