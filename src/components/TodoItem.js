import React from 'react'

export default function TodoItem(props) {
    return (
        <div
            className="todo-item"
            style={{ background: props.todo.isCompleted ? 'lightgreen' : 'pink' }}
        >
            <div
                className="todo-item-title"
                onClick={() => props.markAsComplete(props.todo.id)}
                style = {{textDecoration: props.todo.isCompleted ? 'line-through': ''}}
                >
                {props.todo.title}
            </div>
            <div 
            className="todo-item-action"
            onClick = {() => props.deleteTodo(props.todo.id)}
            >&times;</div>
        </div>
    )
}
