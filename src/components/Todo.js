import React, { Component } from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import Labels from './Labels'
import TodoFilter from './TodoFilter'

export default class Todo extends Component {
    state = {
        todos: [],
        todos2: [],
        filterType: 'All'
    }

    addTodo = (todo) => {
        let item = {
            title: todo,
            id: this.state.todos2.length + 1,
            isCompleted: false
        }
        this.setState({
            todos2: [...this.state.todos2, item]
        }, () => {
            this.setState({
                todos: [...this.state.todos2]
            }, () => {
                this.filterTodo(this.state.filterType);
            })
        })
    }

    markAsComplete = (id) => {
        this.setState({
            todos2: this.state.todos2.map(todo => {
                if (todo.id === id) {
                    todo.isCompleted = !todo.isCompleted;
                }
                return todo;
            })
        }, () => {
            this.setState({
                todos: [...this.state.todos2]
            }, () => {
                this.filterTodo(this.state.filterType);
            })
        })
    }

    deleteTodo = (id) => {
        this.setState({
            todos2: [...this.state.todos2.filter(todo => {
                return todo.id !== id;
            })]
        }, () => {
            this.setState({
                todos: [...this.state.todos2]
            })
        })
    }

    filterTodo = (filterType) => {
        this.setState({
            filterType: filterType
        }, () => {
            this.setState({
                todos: [...this.state.todos2]
            }, () => {
                localStorage.setItem('filterType', this.state.filterType);
                switch (filterType) {
                    case 'all':
                        this.setState({
                            todos: [...this.state.todos2]
                        })
                        break;
                    case 'completed':
                        this.setState({
                            todos: [...this.state.todos2.filter(todo => {
                                return todo.isCompleted === true;
                            })]
                        })
                        break;
                    case 'incomplete':
                        this.setState({
                            todos: [...this.state.todos2.filter(todo => {
                                return todo.isCompleted === false;
                            })]
                        })
                        break;
                    default:
                        break;

                }
            })

        })

    }

    componentDidUpdate = () => {
        if (this.state.todos && this.state.todos2 && this.state.filterType) {
            localStorage.setItem('todos', JSON.stringify(this.state.todos));
            localStorage.setItem('todos2', JSON.stringify(this.state.todos2));
        }
    }

    componentWillMount = () => {
        let todos = localStorage.getItem('todos');
        let todos2 = localStorage.getItem('todos2');
        let filterType = localStorage.getItem('filterType');
        if (todos && todos2 && filterType) {
            this.setState({
                todos: JSON.parse(todos),
                todos2: JSON.parse(todos2),
                filterType: filterType
            }, () => {
                this.filterTodo(filterType);
            })
        }
    }

    componentDidMount = () => {
        let id = this.state.filterType === 'all'
            ? 'filter-button1' : this.state.filterType === 'completed'
                ? 'filter-button2' : 'filter-button3';
        const btnID = document.getElementById(id);
        const btnClass = document.querySelectorAll(".filter-button");

        btnClass.forEach(elem => {
            elem.classList.remove("active");
        })

        btnID.classList.toggle("active");
        const filterType = id === "filter-button1" ? 'all' : id === 'filter-button2' ? 'completed' : 'incomplete';
        this.filterTodo(filterType)
    }

    render() {
        let totalTodos = this.state.todos2.length;
        let totalCompleted = this.state.todos2.filter(todo => {
            return todo.isCompleted === true;
        }).length;
        let totalIncomplete = this.state.todos2.filter(todo => {
            return todo.isCompleted === false;
        }).length;
        return (
            <div className="todo-main">
                <div className="todo-title">React Todo App</div>
                <TodoForm addTodo={this.addTodo} />
                {this.state.todos.length > 0 &&
                    <div>Select an item to mark it as complete</div>
                }
                {this.state.todos.length === 0 &&
                    <div>No task to display!</div>
                }
                <TodoFilter 
                filterTodo={this.filterTodo}
                totalTodos = {totalTodos}
                totalCompleted = {totalCompleted}
                totalIncomplete = {totalIncomplete}
                />
                <TodoList
                    todos={this.state.todos}
                    markAsComplete={this.markAsComplete}
                    deleteTodo={this.deleteTodo}
                />
                <Labels />
            </div>
        )
    }
}
