import React from 'react'

export default function TodoFilter(props) {

    const filter = (id) => {
        const btnID = document.getElementById(id);
        const btnClass = document.querySelectorAll(".filter-button");

        btnClass.forEach(elem => {
            elem.classList.remove("active");
        })

        btnID.classList.toggle("active");
        const filterType = id === "filter-button1"?'all': id === 'filter-button2'?'completed': 'incomplete';
        props.filterTodo(filterType)
    }

    return (
        <div className = "todo-filter">
            <button 
            id = "filter-button1" 
            className = "filter-button active" 
            onClick = {() => filter('filter-button1')}>
                All <span>{props.totalTodos}</span>
                </button>
            <button 
            id = "filter-button2"
            className = "filter-button"
            onClick = {() => filter('filter-button2')}
            >Completed <span>{props.totalCompleted}</span>
            </button>
            <button 
            id = "filter-button3"
            className = "filter-button"
            onClick = {() => filter('filter-button3')}
            >Incomplete <span>{props.totalIncomplete}</span>
            </button>
        </div>
    )
}
