
import utilities from "./utilities.js";
import ls from "./ls.js";

document.querySelector("#addButton").onclick = makeTodo;

document.addEventListener("DOMContentLoaded", loadTodos());

document.querySelector("#resetButton").onclick = resetButton;

document.querySelector("#completeFilter").onclick = filter;
document.querySelector("#unfinishedFilter").onclick = filter;
document.querySelector("#resetFilter").onclick = filter;


function resetButton () {
    localStorage.clear();
    document.getElementById("todos").innerHTML = '';

}

function loadTodos() {
    const todoList = ls.getTodoList();

    todoList.forEach(todo => {
        const el = createDiv(todo);
        addTodoList(el);
    })
}

function makeTodo () {
    const todo = createNew();
    const todoDiv = createDiv(todo);
    addTodoList(todoDiv);
    ls.saveTodo(todo);
}

function createNew() {
    const input = document.querySelector("#todo-text");
    const newTodo = { id: Date.now(), content: input.value, completed: false}
    input.value = '';
    return newTodo;
}

function createDiv(todo) {
     //create todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo-item');

    //add complete button
    const completeButton = document.createElement('button');
    completeButton.classList.add('complete-button');
    completeButton.setAttribute('data-id', todo.id);
    completeButton.setAttribute('id', todo.id)
    completeButton.onclick = completeTodo;

    //build todo content
    const todoContent = document.createElement('div');
    todoContent.innerText = todo.content;
    todoContent.classList.add('todo-content');

    //add delete button
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('data-id', todo.id);
    deleteButton.classList.add('delete-button');
    deleteButton.innerText = "Delete";
    deleteButton.onclick = deleteTodo;
    
    todoDiv.appendChild(completeButton);
    todoDiv.appendChild(todoContent);
    todoDiv.appendChild(deleteButton);

    if (todo.completed == true ) {
        completeButton.innerHTML = '\u2713';
        todoContent.classList.add('strikethrough');
    }
        else {
            completeButton.innerHTML = " ";
        }
    return todoDiv;

    
}

function addTodoList(todoDiv) {
    document.querySelector('#todos').appendChild(todoDiv);
}

function deleteTodo(e) {
    const button = e.currentTarget;
    ls.deleteTodo(button.getAttribute('data-id'));
    document.querySelector("#todos").innerHTML = '';
    loadTodos();
}


function completeTodo(e) {
    const button = e.currentTarget;
    const buttonID = button.getAttribute('data-id');
    const todoList = ls.getTodoList();
    var i = 0;
    const text = button.nextElementSibling;

    for (i in todoList) {
        if (todoList[i].id == buttonID) {
            if (todoList[i].completed == false) {
                todoList[i].completed = true;
                document.getElementById(buttonID).innerHTML = "\u2713";
                text.classList.add('strikethrough');
            }
            else {
                todoList[i].completed = false
               document.getElementById(buttonID).innerHTML = "";
               text.classList.remove('strikethrough');
            }
            localStorage.setItem("todoList", JSON.stringify(todoList));
            break;
        }
    
    }   

} 

function filter(e) {
    document.querySelector('#todos').innerHTML = '';

    let filteredTodos = [];
    const allTodos = ls.getTodoList();
    const filterItem = e.currentTarget.id;

    if (filterItem == 'unfinishedFilter') {
        filteredTodos = utilities.activeFilter(allTodos);
    } else if (filterItem == 'resetFilter') {
        filteredTodos = allTodos;
    } else {
        filteredTodos = utilities.unfinishedFilter(allTodos);
    }

    filteredTodos.forEach( todo => {
        const el = createDiv(todo);
        addTodoList(el);
    })
}

 